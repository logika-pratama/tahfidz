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
  readDataMustrif,
  readDataSantri
} = require('../models/halaqah_santri_model');

router.post('/add', [
  body('id_master_halaqah').notEmpty(),
  body('kode_user').notEmpty(),
  body('tahun_halaqah').notEmpty(),
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

router.get('/detail/:id',tokenjwt.verify, function (req, res){
  detailData(res, req);
});

router.get('/detailSantri/:id',tokenjwt.verify, function (req, res){
  readDataSantri(res, req);
});

router.patch('/edit/:id', [
  body('id_master_halaqah').notEmpty(),
  body('kode_user').notEmpty(),
  body('tahun_halaqah').notEmpty(),
],tokenjwt.verify, function (req, res){
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
      return res.status(422).json({
          errors: errors.array()
      });
  }
  editData(res, req)
});

router.delete('/delete/(:id)',tokenjwt.verify, function(req, res) {
 deleteData(res, req)
});

router.get('/listmusrif',tokenjwt.verify, function (req, res){
  readDataMustrif(res, req);
});

module.exports = router;
