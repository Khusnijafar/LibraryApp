const {promisify} = require('util')
const jwt = require('jsonwebtoken');
const User = require('./../models/userModel');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');

const signToken = id => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN
    })
}

const createSendToken = (user, statusCode, req, res) => {
    const token = signToken(user._id);
      res.status(statusCode).json({
    status: 'success',
    token,
    data: {
      user
    }
  });
};

exports.signup = catchAsync (async (req, res, next) => {
    const newUser = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        passwordConfirm: req.body.passwordConfirm
      });
      console.log(req.body);
      
      createSendToken(newUser, 201, req, res);
})

exports.login = catchAsync(async(req, res, next) => {
    const {email, password} = req.body;

    // check apakah email dan password ada
    if(!email || !password) {
       return next(new AppError('Please provide email and password', 400))
    }
    // check apakah user ada dan passwordnya benar
    const user = await User.findOne({ email }).select('+password')

    if (!user || !(await user.correctPassword(password, user.password))) {
        return next(new AppError('Incorrect email or password', 401));
    }
    
    // jika semua lengkap, sediakan token
    const token = signToken(user._id);

    res.status(200).json({
        status: 'success',
        token
    })  
})

exports.protect = catchAsync(async (req, res, next) => {
    // dpt token dan check
    let token;
    if(
      req.headers.authorization && 
      req.headers.authorization.startsWith('Bearer')
    ) {
      token = req.headers.authorization.split(' ')[1];
    }
    // console.log(token);
    
    if(!token) {
      return next(
        new AppError('You are not logged in!, Please log in to get access', 401)
      )
    }
    // Verification token
    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET)
    // console.log(decoded);
    
    // Check apakah user masih ada
    const currentUser = await User.findById(decoded.id)
    if (!currentUser) {
        return next(
            new AppError(
                'The user belonging to this token does no longer exist.',
                401  
            )
        )
    }

    // Check apakah user mengubah password saat token dikeluarkan
    if (currentUser.changedPasswordAfter(decoded.iat)) {
        return next(
            new AppError('User recently changed password! Please log in again.', 401)
        )
    }

    // Grant access 
     req.user = currentUser
     next()
})

exports.restrictTo =  (...roles) => {
    return (req, res, next) => {
        // roles ['admin']. role='user'
        if (!roles.includes(req.user.role)) {
          return next(
            new AppError('You do not have permission to perform this action', 403)
          );
        }
        next();
    };
}