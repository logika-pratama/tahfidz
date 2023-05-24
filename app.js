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
var dashboardRouter = require('./routes/dashboard');


var app = express();

app.use(express.static(path.join(__dirname, 'public')));

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
app.use('/dashboard', dashboardRouter);

app.use(function(req, res, next) {
  res.status(404)
  res.send({
    status:404,
    error:"Not Found"
  })
});


app.use(function(err, req, res, next) {
  res.status(err.status || 500)
  res.send({
    error: {
      status:err.status || 500,
      error:err.message
    }
  })
});

module.exports = app;
