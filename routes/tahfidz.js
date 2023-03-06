const express = require('express');
const { response } = require('express');
const dotenv = require('dotenv');
dotenv.config();
const router = express.Router();
const { body, validationResult } = require('express-validator');
const tokenjwt = require('../helper/jwt');

const { 
  addData,
  deleteData,
  editData,
  readData,
  detailData,
  readDataList,
  readDataSantri,
} = require('../models/tahfidz_model');

router.post('/add', [
  body('id_surah_from').notEmpty(),
  body('ayat_from_first').notEmpty(),
  body('ayat_from_last').notEmpty(),
  body('nilai_tahfidz').notEmpty(),
],tokenjwt.verify, function (req, res){
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
      return res.status(422).json({
          errors: errors.array()
      });
  }
  addData(res, req);
});

router.get('/list',tokenjwt.verify, function (req, res){
  readData(res, req);
});

router.get('/tahfidz_list',tokenjwt.verify, function (req, res){
  readDataList(res, req);
});

router.get('/detail/:id',tokenjwt.verify, function (req, res){
  detailData(res, req);
});

router.get('/detailSantri/:id',tokenjwt.verify, function (req, res){
  readDataSantri(res, req);
});


router.delete('/delete/(:id)',tokenjwt.verify, function(req, res) {
 deleteData(res, req);
});

module.exports = router;
