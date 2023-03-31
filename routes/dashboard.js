const express = require('express');
const { response } = require('express');
const dotenv = require('dotenv');
dotenv.config();

const router = express.Router();
const { body, validationResult } = require('express-validator');
const tokenjwt = require('../helper/jwt');

const { 
  getCount,
  getHistoryTahfidz,
} = require('../models/dashboard_model');


router.get('/getCount',tokenjwt.verify, function (req, res){
  getCount(res, req);
});

router.get('/getHistoryTahfidz',tokenjwt.verify, function (req, res){
  getHistoryTahfidz(res, req);
});

module.exports = router;
