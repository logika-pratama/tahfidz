const connection = require('../config/database');
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const jwt = require('jsonwebtoken');
const var_dump = require('var_dump')
const tokenjwt = require('../helper/jwt');

const { 
  sendEmail
} = require('../models/notifemail');

exports.loginUsers = (res, req) => {
  connection.query('\
    SELECT u.id_account,u.kode_user,u.username,u.email,u.hakakses_user,u.password \
    FROM user u \
    LEFT JOIN account a ON u.id_account = a.id_account \
    WHERE u.email="'+req.body.email+'" \
    ', function (err, rows) {
    if(!rows.length){
      return res.status(404).json({
          status: false,
          message: 'Email tidak terdaftar',
      });
    } else {
      var passwordIsValid = bcrypt.compareSync(
        req.body.password,
        rows[0]['password']
      );

      if (!passwordIsValid) {
        return res.status(401).send({
          status: false,
          message: "Invalid Password!"
        });
      } else {
        const token = tokenjwt.generate({ 
            username:rows[0]['username'],
            kode_user:rows[0]['kode_user'],
            email:req.body.email,
            name:'users',
            id_account:rows[0]['id_account'],
            hakakses_user:rows[0]['hakakses_user'] 
        });

        if(rows[0]['kode_user'] == ''){
          aktifasi = 0;
        } else if(rows[0]['hakakses_user'] == '') {
          aktifasi = 2;
        } else {
          aktifasi = 1;
        }

        return res.status(200).send({
          token: token,
          aktifasi:aktifasi,
          status: true,
          message: "Selamat berhasil login!",
        });
      }
    }
  });
};

exports.registerUsers = (res, req, next) => {

  if (req.body.password != req.body.repassword) {
    return res.status(422).json({
      status: false,
      message: 'Passwod tidak sama!'
    })
  }

  connection.query('SELECT seq FROM user ORDER BY seq DESC', function (err, rows) {
    if(!rows.length){
      seq = 0;
    } else {
      seq = rows[0]['seq'] + 1;
    }

    const hash = bcrypt.hashSync(req.body.password, 5);

    z = '0';
    n = seq + '';
    var result = n.length >= 5 ? n : new Array(5 - n.length + 1).join(z) + n;
  
    var kode_user = 'THFZ'+result;

    let formData = {
      kode_user: kode_user,
      email: req.body.email,
      username: req.body.username,
      password: hash,
      token: "",
      date_login: new Date(),
      status_login: "non-aktif",
      generate: "",
      status_user: "non-aktif",
      hakakses_user: "",
      id_account: req.body.id_account,
      seq:seq
    }

    connection.query('SELECT COUNT(email) as TOTAL FROM user WHERE email="'+req.body.email+'"', function (err, rows) {
      if(parseInt(rows[0]['TOTAL']) > 0){
        return res.status(422).json({
            status: false,
            message: 'Email telah digunakan',
        })
      } else {
        connection.query('INSERT INTO user SET ?', formData, function (err, rows) {
            if(err){
                return res.status(500).json({
                    status: false,
                    message: 'Internal Server Error',
                })
            } else {
                sendEmail(res, req.body.email);
                const token = tokenjwt.generate({ 
                  username:req.body.username,
                  kode_user:kode_user,
                  email:req.body.email,
                  name:'users',
                  hakakses_user:'',
                  id_account:req.body.id_account 
                });

                return res.status(201).json({
                    status: true,
                    token : token,
                    email:req.body.email,
                    message: 'Akun Berhasil diregistrasi',
                    aktifasi: 0
                })
            }
        })
      }
    });
  });
}

exports.registerSantri = (res, req) => {
    let formData = {
      kode_user: req.kode_user,
      nis: req.body.nis,
      nama_santri: req.body.nama_santri,
      tgl_lahir: req.body.tgl_lahir,
      telp: '+62'+req.body.telp,
      alamat: req.body.alamat,
      tahun_ajaran: req.body.tahun_ajaran,
      gol_darah: req.body.gol_darah,
      id_account:req.id_account
    }

    connection.query('INSERT INTO santri SET ?', formData, function (err, rows) {
     
        if(err){
            return res.status(500).json({
                status: false,
                message: 'Internal Server Error',
            })
        } else {

          let formData = {
            hakakses_user: 'santri',
          }
          connection.query('UPDATE user SET ? WHERE email = "'+req.email+'"', formData, function (err, rows) {});

            const token = tokenjwt.generate({ 
              username:req.username,
              kode_user:req.kode_user,
              email:req.email,
              name:'users',
              hakakses_user:'santri', 
              id_account:req.body.id_account 
            });

            return res.status(201).json({
                status: true,
                token : token,
                email:req.body.email,
                message: 'Akun Berhasil diregistrasi',
                aktifasi: 1
            })
        }
    })
}

exports.registerMusrif = (res, req) => {
  let formData = {
    kode_user: req.kode_user,
    nama_musrif: req.body.nama_musrif,
    tgl_lahir: req.body.tgl_lahir,
    telp: '+62'+req.body.telp,
    alamat: req.body.alamat,
    instansi: req.body.instansi,
    gol_darah: req.body.gol_darah,
    pendidikan: req.body.pendidikan,
    hafalan: req.body.hafalan,
    hakakses_musrif: 'musrif',
    gol_darah: req.body.gol_darah,
    id_account:req.id_account
  }

  connection.query('INSERT INTO musrif SET ?', formData, function (err, rows) {
      if(err){
          return res.status(500).json({
              status: false,
              message: 'Internal Server Error',
          })
      } else {

        let formData = {
          hakakses_user: 'musrif',
        }
        connection.query('UPDATE user SET ? WHERE kode_user = "'+req.kode_user+'"', formData, function (err, rows) {});

          const token = tokenjwt.generate({ 
            username:req.username,
            kode_user:req.kode_user,
            email:req.body.email,
            hakakses_user: 'musrif',
            name:'users',
            id_account:req.body.id_account 
          });

          return res.status(201).json({
              status: true,
              token : token,
              email:req.body.email,
              message: 'Akun Berhasil diregistrasi',
              aktifasi: 1
          })
      }
  })
}

exports.editProfile = (res, req, next) => {
  let formData = {
    "nama_santri": req.body.nama_santri,
    "nis": req.body.nis,
    "tgl_lahir": req.body.tgl_lahir,
    "telp": req.body.telp,
    "alamat": req.body.alamat,
    "id_provinsi": req.body.id_provinsi,
    "id_kota": req.body.id_kota,
    "tahun_ajaran": req.body.tahun_ajaran,
    "gol_darah": req.body.gol_darah
  }

  connection.query('UPDATE santri SET ? WHERE kode_user = "'+req.kode_user+'"', formData, function (err, rows) {
      if (err) {
          return res.status(500).json({
              status: false,
              message: 'Internal Server Error',
          })
      } else {
          return res.status(200).json({
              status: true,
              message: 'Data Santri berhasil diupdate!'
          })
      }
  })
};

exports.editMusrif = (res, req, next) => {
  let formData = {
    nama_musrif: req.body.nama_musrif,
    tgl_lahir: req.body.tgl_lahir,
    telp: '+62'+req.body.telp,
    alamat: req.body.alamat,
    instansi: req.body.instansi,
    gol_darah: req.body.gol_darah,
    pendidikan: req.body.pendidikan,
    hafalan: req.body.hafalan,
    gol_darah: req.body.gol_darah,
  }

  connection.query('UPDATE musrif SET ? WHERE kode_user = "'+req.kode_user+'"', formData, function (err, rows) {
      if (err) {
          return res.status(500).json({
              status: false,
              message: 'Internal Server Error',
          })
      } else {
          return res.status(200).json({
              status: true,
              message: 'Data Santri berhasil diupdate!'
          })
      }
  })
};

exports.forgotpw = (res, req, next) => {
  const min = 1000;
  const max = 2000;
  result = Math.random() * (max - min + 1) + min;
  const hash = crypto.createHash('md5').update(result.toString()).digest("hex");
  let formData = {
      generate: hash
  }

  connection.query('UPDATE user SET ? WHERE email = "'+req.body.email+'"', formData, function (err, rows) {
      if (err) {
          return res.status(500).json({
              status: false,
              message: 'Internal Server Error',
          })
      } else {
          return res.status(200).json({
              status: true,
              message: 'Permintaan update password berhasil!'
          })
      }
  })
};


exports.changepw = (res, req, next) => {

  if (req.body.password != req.body.repassword) {
    return res.status(422).json({
      status: false,
      message: 'Passwod tidak sama!',
    })
  }

  const hash = bcrypt.hashSync(req.body.password, 5);

  let formData = {
      password: hash
  }

  connection.query('UPDATE user SET ? WHERE generate = "'+req.params.id+'"', formData, function (err, rows) {
    if (err) {
          return res.status(500).json({
              status: false,
              message: 'Erorr update data',
          })
      } else {
          return res.status(200).json({
              status: true,
              message: 'Password berhasil diganti!'
          })
      }
  })
};

exports.readData = (res, req) => {
  connection.query('SELECT *,m.tgl_lahir as tgl_lahir_m, m.telp as telp_m, m.alamat as alamat_m, m.gol_darah as gol_darah_m FROM user u\
  LEFT JOIN musrif m ON u.kode_user = m.kode_user\
  LEFT JOIN santri s ON u.kode_user = s.kode_user\
  WHERE email="'+req.email+'"', function (err, rows) {
      if(!rows.length){
          return res.status(404).json({
              status: false,
              message: 'Data Users gagal didapat',
          })
      } else {
          return res.status(201).json({
              status: true,
              message: 'success',
              data:rows,
          })
      }
  })
};