let createError = require('http-errors');
let express = require('express');
let path = require('path');
let cookieParser = require('cookie-parser');
let logger = require('morgan');
const mongoose = require('mongoose');
let sha256File = require('sha256-file');
let session = require('express-session');

const fileUpload = require('express-fileupload');

let indexRouter = require('./routes/index');
let userRouter = require('./routes/users');
let authRouter = require('./routes/auth');
let uploadRouter = require('./routes/upload');
let signRouter = require('./routes/sign');

let app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

mongoose.connect('mongodb://localhost/abcdB');

app.use(
	session({
		secret            : "Poda baadu I'm not telling you",
		resave            : false,
		saveUninitialized : true
	})
);

app.use(logger('dev'));
app.use(express.json());
app.use(
	express.urlencoded({
		extended : false
	})
);
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/files', express.static(path.join(__dirname, 'files')));

app.use('/', indexRouter);
app.use('/', userRouter);
app.use('/', authRouter);
app.use('/', uploadRouter);
app.use('/', signRouter);

app.get('/verify_hash', (req, res, next) => {
	res.render('verify_hash');
});

// default options

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

//testing the mail api
//sgMail.setApiKey(process.env.SENDGRID_API_KEY);

module.exports = app;
