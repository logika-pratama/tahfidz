require('dotenv').config();
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cors = require('cors')
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var m_halaqahRouter = require('./routes/m_halaqah');
var m_kelasRouter = require('./routes/m_kelas');
var m_mutabaahRouter = require('./routes/m_mutabaah');
var halaqah_santriRouter = require('./routes/halaqah_santri');
var mutabaahRouter = require('./routes/mutabaah');
var tahfidzRouter = require('./routes/tahfidz');
var surahRouter = require('./routes/surah');


var app = express();

app.use(express.static(path.join(__dirname, 'public')));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(cors());

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/m_halaqah', m_halaqahRouter);
app.use('/m_kelas', m_kelasRouter);
app.use('/m_mutabaah', m_mutabaahRouter);
app.use('/halaqah_santri', halaqah_santriRouter);
app.use('/mutabaah', mutabaahRouter);
app.use('/tahfidz', tahfidzRouter);
app.use('/surah', surahRouter);


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
