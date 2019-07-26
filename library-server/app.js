var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');

var indexRouter = require('./routes/index');
var libraryRouter = require('./routes/library')
var loanbookRouter = require('./routes/loanbook')
var userRouter = require('./routes/userRoutes')

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// set security http headers
app.use(helmet())

// Development logging
if (process.env.NODE_ENV === 'development') {
  app.use(logger('dev'));
}

app.use(express.json());

// Data sanitization against NoSQL query injection
app.use(mongoSanitize());

// Data against XSS
app.use(xss());

app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString()
  // console.log(req.headers);
  next()
})

// Routes
app.use('/', indexRouter);
app.use('/api/library', libraryRouter)
app.use('/api/loanbook', loanbookRouter)
app.use('/api/user', userRouter)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
