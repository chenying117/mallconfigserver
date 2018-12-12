var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose');
var log = require("./modules/log");

// 跨域处理
var cors = require('cors');

// --- end

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var goodsRouter = require('./routes/goods');
var menusRouter = require('./routes/menus');
var boxRouter = require('./routes/box');
var logRouter = require('./routes/log');
var schedule = require('./routes/schedule');

var app = express();
app.use(cors());
// 拦截器

app.use(function (req, res, next) {
    console.log("sys：");
    console.log(req.url,req.body);
    log.insertMany({
        userName:"",
        url:req.url,
        time: Date.now()
    }, (err, doc)=>{
    });
    next();
});
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/users/delete', usersRouter);
app.use('/goods', goodsRouter);
app.use('/menus', menusRouter);
app.use('/box', boxRouter);
app.use('/logs',logRouter);
app.use('/logs/query', logRouter);
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


var uri ="mongodb://root:123@127.0.0.1:27017/vuemall";
mongoose.connect(uri,{ useNewUrlParser: true });
var db = mongoose.connection;
db.on('error',  function() {
    console.log("mongodb error!");
});
db.once('open', function() {
    // we're connected!
    console.log("mongodb opened!");
});

module.exports = app;
