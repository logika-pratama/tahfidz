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
  readDataListDetail,
} = require('../models/m_mutabaah_model');

router.post('/add', [
  body('master_mutabaah').notEmpty(),
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

router.get('/mutabaah_list',tokenjwt.verify, function (req, res){
  readDataList(res, req);
});

router.get('/mutabaah_list_detail/:day/:month/:year',tokenjwt.verify, function (req, res){
  readDataListDetail(res, req);
});

router.get('/detail/:id',tokenjwt.verify, function (req, res){
  detailData(res, req);
});

router.patch('/edit/:id', [
  body('master_mutabaah').notEmpty(),
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

module.exports = router;
