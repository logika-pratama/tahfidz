const express = require('express');
const { response } = require('express');
const dotenv = require('dotenv');
dotenv.config();
const router = express.Router();
const { body, validationResult } = require('express-validator');
const tokenjwt = require('../helper/jwt');

const { 
  list,
  detail,
} = require('../models/surah_model');

router.get('/list',tokenjwt.verify, function (req, res){
  list(res, req);
});

router.get('/detail/:id',tokenjwt.verify, function (req, res){
  detail(res, req);
});

module.exports = router;
