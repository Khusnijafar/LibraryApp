const Library = require('./../models/library')
const APIFeatures = require('./../utils/apiFeatures');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');

exports.getAllLibrary = catchAsync(async (req, res, next) => {
    const features = new APIFeatures(Library.find(), req.query)
      .filter()
      .sort()
      .limitFields()
      .paginate();
    const libraries = await features.query;

    res.status(200).json({
      status: 'success',
      results: libraries.length,
      data: {
        libraries
      }
    });
  });
  
  exports.getLibrary = catchAsync(async (req, res, next) => {
    const library = await Library.findById(req.params.id);
  
    if (!library) {
      return next(new AppError('No book found with that ID', 404));
    }
          res.status(200).json({
            status: 'success',
            data: {
                library
            }
        });
    });
  
  exports.createLibrary = catchAsync(async (req, res, next) => {
    const newLibrary = await Library.create(req.body);
  
    res.status(201).json({
      status: 'success',
      data: {
        library: newLibrary
      }
    });
  });
  
  exports.updateLibrary = catchAsync(async (req, res, next) => {
    const library = await Library.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
  
    if (!library) {
      return next(new AppError('No library found with that ID', 404));
    }
  
    res.status(200).json({
      status: 'success',
      data: {
        library
      }
    });
  });
  
  exports.deleteLibrary = catchAsync(async (req, res, next) => {
    const library = await Library.findByIdAndDelete(req.params.id);
  
    if (!library) {
      return next(new AppError('No book found with that ID', 404));
    }
  
    res.status(204).json({
      status: 'success',
      data: null
    });
  });
  