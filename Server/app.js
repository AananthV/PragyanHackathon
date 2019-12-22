var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose = require('mongoose');
var sha256File = require('sha256-file');
var session = require('express-session');

const fileUpload = require('express-fileupload');

var indexRouter = require('./routes/index');
var userRouter = require('./routes/users');
var authRouter = require('./routes/auth');
var uploadRouter = require('./routes/upload');
var signRouter = require('./routes/sign');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

mongoose.connect('mongodb://localhost/abcdB');

app.use(
	session({
		secret: 'Poda baadu I\'m not telling you',
		resave: false,
		saveUninitialized: true
	})
)

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
	extended: false
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/files', express.static(path.join(__dirname, 'files')));

app.use('/', indexRouter);
app.use('/', userRouter);
app.use('/', authRouter);
app.use('/', uploadRouter);
app.use('/', signRouter);

// default options

// catch 404 and forward to error handler
app.use(function (req, res, next) {
	next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
	// set locals, only providing error in development
	res.locals.message = err.message;
	res.locals.error = req.app.get('env') === 'development' ? err : {};

	// render the error page
	res.status(err.status || 500);
	res.render('error');
});

module.exports = app;