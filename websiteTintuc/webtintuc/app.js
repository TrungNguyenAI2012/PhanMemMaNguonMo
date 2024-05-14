var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var expresshbs = require('express-handlebars')

var app = express();

// view engine setup
app.engine('.hbs', expresshbs({ defaultLayout: 'layout', extname: '.hbs' }));
app.set('view engine', 'hbs');


var mongodb = require('mongoose');
var MongoClient = mongodb.MongoClient;
var url = `mongodb+srv://thanhphong:12345@cluster0.l8w96.mongodb.net/Tintuc?retryWrites=true&w=majority`;

mongodb.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, function(err, db) {
    if (err) console.log('Error connect:' + err)
    else console.log('Connected.')
});
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

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