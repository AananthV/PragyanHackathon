var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose = require('mongoose');
var sha256File = require('sha256-file');

const fileUpload = require('express-fileupload');

var indexRouter = require('./routes/index');
var authRouter = require('./routes/auth');
var uploadRouter = require('./routes/upload');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

mongoose.connect('mongodb://localhost/abcdB');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
	extended: false
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/', authRouter);
app.use('/', uploadRouter);

app.use(fileUpload());
app.get('/login', function (req, res, next) {
	res.render('login');
});

app.get('/register', function (req, res, next) {
	res.render('register');
});

app.get('/upload', function (req, res, next) {
	res.render('upload');
});

// default options

app.post('/upload', function (req, res) {
	console.log('upload post');
	console.log(req.files);

	if (!req.files || Object.keys(req.files).length === 0) {
		return res.status(400).send('No files were uploaded.');
	}

	// The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
	let sampleFile = req.files.sampleFile;

	console.log(sampleFile);

	// Use the mv() method to place the file somewhere on your server
	sampleFile.mv(`./files/${sampleFile.name}`, function (err) {
		if (err) return res.status(500).send(err);

		sha256File(`./files/${sampleFile.name}`, (error, sum) => {
			if (error) return console.log(error);
			console.log(sum);
			return res.status(200).send(sum);
		});
	});
});
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