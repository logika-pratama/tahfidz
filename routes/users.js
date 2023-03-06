const express = require('express');
const { response } = require('express');
const dotenv = require('dotenv');
dotenv.config();

const router = express.Router();
const { body, validationResult } = require('express-validator');
const tokenjwt = require('../helper/jwt');

const { 
  activeEmail
} = require('../models/notifemail');

const { 
  loginUsers,
  registerUsers,
  editProfile,
  forgotpw,
  readData,
  registerSantri,
  registerMusrif,
  changepw
} = require('../models/users_model');

router.put('/update', [
  body('nis').notEmpty(),
  body('nama_santri').notEmpty(),
  body('tgl_lahir').notEmpty(),
  body('tahun_ajaran').notEmpty()
], tokenjwt.verify, (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
      return res.status(422).json({
          errors: errors.array()
      });
  }
  editProfile(res, req, next);
});

router.post('/tambah', [
  body('email').notEmpty(),
  body('username').notEmpty(),
  body('password').notEmpty(),
  body('repassword').notEmpty(),
  body('id_account').notEmpty(),
],tokenjwt.basic_auth, function (req, res){
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
      return res.status(422).json({
          errors: errors.array()
      });
  }
  registerUsers(res, req);
});

router.post('/tambah_santri', [
  body('nama_santri').notEmpty(),
  body('tgl_lahir').notEmpty(),
  body('telp').notEmpty(),
  body('gol_darah').notEmpty()
],tokenjwt.verify, function (req, res){
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
      return res.status(422).json({
          errors: errors.array()
      });
  }
  registerSantri(res, req);
});

router.post('/tambah_musrif', [
  body('nama_musrif').notEmpty(),
  body('tgl_lahir').notEmpty(),
  body('telp').notEmpty(),
  body('hafalan').notEmpty()
],tokenjwt.verify, function (req, res){
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
      return res.status(422).json({
          errors: errors.array()
      });
  }
  registerMusrif(res, req);
});


router.post('/login', [
  body('email').notEmpty(),
  body('password').notEmpty(),
],tokenjwt.basic_auth, function (req, res){
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
      return res.status(422).json({
          errors: errors.array()
      });
  }
  loginUsers(res, req)
});

router.get('/aktifasi/:id', tokenjwt.basic_auth, function(req, res){
  activeEmail(res,req);
});

router.put('/forgotpw', [
  body('email').notEmpty(),
],tokenjwt.basic_auth, function (req, res){
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
      return res.status(422).json({
          errors: errors.array()
      });
  }
  forgotpw(res, req)
});

router.patch('/changepw/:id', [
  body('password').notEmpty(),
  body('repassword').notEmpty()
],tokenjwt.basic_auth, function (req, res){
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
      return res.status(422).json({
          errors: errors.array()
      });
  }
  changepw(res, req)
});

router.get('/getData',tokenjwt.verify, function (req, res){
  readData(res, req);
});


module.exports = router;
