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
  getCalendar,
  readUserList,
} = require('../models/mutabaah_model');

router.post('/add', [],tokenjwt.verify, function (req, res){
  addData(res, req);
});

router.post('/mutabaah_user', [],tokenjwt.verify, function (req, res){
  readUserList(res, req);
});

router.get('/list',tokenjwt.verify, function (req, res){
  readData(res, req);
});

router.get('/mutabaah_list',tokenjwt.verify, function (req, res){
  readDataList(res, req);
});

router.get('/detail/:id',tokenjwt.verify, function (req, res){
  detailData(res, req);
});

router.get('/getCalendar/:month/:year',tokenjwt.verify, function (req, res){
  getCalendar(res, req);
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
