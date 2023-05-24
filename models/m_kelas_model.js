const connection = require('../config/database');
const jwt = require('jsonwebtoken');
const tokenjwt = require('../helper/jwt');

exports.addData = (res, req) => {
    let formData = {
      nama_kelas: req.body.nama_kelas,
      id_account: req.id_account
    }

    connection.query('SELECT COUNT(nama_kelas) as TOTAL FROM kelas WHERE nama_kelas="'+req.body.nama_kelas+'" AND id_account="'+req.id_account+'"', function (err, rows) {
      if(parseInt(rows[0]['TOTAL']) > 0){
        return res.status(422).json({
            status: false,
            message: 'Kode Kelas telah digunakan',
        })
      } else {
        connection.query('INSERT INTO kelas SET ?', formData, function (err, rows) {
            if(err){
                return res.status(500).json({
                    status: false,
                    message: err.message,
                })
            } else {
                return res.status(201).json({
                    status: true,
                    message: 'Kelas Berhasil ditambah',
                })
            }
        })
      }
    });
};

exports.editData = (res, req) => {
  let formData = {
    nama_kelas: req.body.nama_kelas,
    id_account: req.id_account
  }

  connection.query('SELECT COUNT(id_kelas) as TOTAL FROM kelas WHERE nama_kelas ="'+req.body.nama_kelas+'" AND id_account="'+req.id_account+'" AND id_kelas<>"'+req.params.id+'"', function (err, rows) {
    if(parseInt(rows[0]['TOTAL']) > 0){
      return res.status(422).json({
          status: false,
          message: 'Kode Kelas telah digunakan',
      })
    } else {
      connection.query('UPDATE kelas SET ? WHERE id_kelas = "'+req.params.id+'"', formData, function (err, rows) {
        if(err){
            return res.status(500).json({
                status: false,
                message: err.message,
            })
        } 
        if(!rows.length){
            return res.status(404).json({
                status: false,
                message: 'Kelas gagal diubah',
            })
        } else {
            return res.status(201).json({
                status: true,
                message: 'Kelas Berhasil diubah',
            })
        }
      })
    }
  });
};

exports.deleteData = (res, req) => {
  let id = req.params.id;
  connection.query('DELETE FROM kelas WHERE id_kelas= "'+id+'" AND id_account = "'+req.id_account+'"', function(err, rows) {
      if (err) {
          return res.status(500).json({
              status: false,
              message: 'Kelas gagal dihapus',
          })
      } else {
          return res.status(200).json({
              status: true,
              message: 'Kelas Berhasil dihapus!',
          })
      }
  })
};

exports.readData = (res, req) => {
    connection.query('SELECT * FROM kelas WHERE id_account="'+req.id_account+'"', function (err, rows) {
        if(err){
            return res.status(500).json({
                status: false,
                message: err.message,
            })
        }
        if(!rows.length){
            return res.status(404).json({
                status: false,
                message: 'Data Kelas gagal didapat',
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

exports.detailData = (res, req) => {
  connection.query('SELECT * FROM kelas WHERE id_kelas ="'+req.params.id+'" AND id_account="'+req.id_account+'"', function (err, rows) {
    if(err){
        return res.status(500).json({
            status: false,
            message: err.message,
        })
    }
    if(!rows.length){
        return res.status(404).json({
            status: false,
            message: 'Data Kelas gagal didapat',
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