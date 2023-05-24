const connection = require('../config/database');
const jwt = require('jsonwebtoken');
const tokenjwt = require('../helper/jwt');

exports.addData = (res, req) => {
    let formData = {
      id_kelas: req.body.id_kelas,
      kode_halaqah: req.body.kode_halaqah,
      halaqah: req.body.halaqah,
      id_account: req.id_account
    }

    connection.query('SELECT COUNT(kode_halaqah) as TOTAL FROM master_halaqah WHERE kode_halaqah="'+req.body.kode_halaqah+'" AND id_account="'+req.id_account+'"', function (err, rows) {
      if(parseInt(rows[0]['TOTAL']) > 0){
        return res.status(422).json({
            status: false,
            message: 'Kode Halaqah telah digunakan',
        })
      } else {
        connection.query('INSERT INTO master_halaqah SET ?', formData, function (err, rows) {
            if(err){
                return res.status(500).json({
                    status: false,
                    message: err.message,
                })
            } else {
                return res.status(201).json({
                    status: true,
                    message: 'Halaqah Berhasil ditambah',
                })
            }
        })
      }
    });
};

exports.editData = (res, req) => {
  let formData = {
    id_kelas: req.body.id_kelas,
    kode_halaqah: req.body.kode_halaqah,
    halaqah: req.body.halaqah,
    id_account: req.id_account
  }

  connection.query('SELECT COUNT(id_master_halaqah) as TOTAL FROM master_halaqah WHERE kode_halaqah ="'+req.body.kode_halaqah+'" AND id_account="'+req.id_account+'" AND id_master_halaqah<>"'+req.params.id+'"', function (err, rows) {
    if(parseInt(rows[0]['TOTAL']) > 0){
      return res.status(422).json({
          status: false,
          message: 'Kode Halaqah telah digunakan',
      })
    } else {
      connection.query('UPDATE master_halaqah SET ? WHERE id_master_halaqah = "'+req.params.id+'"', formData, function (err, rows) {
        if(err){
            return res.status(500).json({
                status: false,
                message: err.message,
            })
        }  
        if(!rows.length){
              return res.status(404).json({
                  status: false,
                  message: 'Halaqah gagal diubah',
              })
        } else {
              return res.status(201).json({
                  status: true,
                  message: 'Halaqah Berhasil diubah',
              })
        }
      })
    }
  });
};

exports.deleteData = (res, req) => {
  let id = req.params.id;
  connection.query('DELETE FROM master_halaqah WHERE id_master_halaqah= "'+id+'" AND id_account = "'+req.id_account+'"', function(err, rows) {
      if (err) {
          return res.status(500).json({
              status: false,
              message: 'Halaqah gagal dihapus',
          })
      } else {
          return res.status(200).json({
              status: true,
              message: 'Halaqah Berhasil dihapus!',
          })
      }
  })
};

exports.readData = (res, req) => {
    connection.query('SELECT * FROM master_halaqah WHERE id_account="'+req.id_account+'"', function (err, rows) {
        if(!rows.length){
            return res.status(404).json({
                status: false,
                message: 'Data Halaqah gagal didapat',
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
  connection.query('SELECT * FROM master_halaqah WHERE kode_halaqah ="'+req.params.id+'" AND id_account="'+req.id_account+'"', function (err, rows) {
    if(err){
        return res.status(500).json({
            status: false,
            message: err.message,
        })
    }  
    if(!rows.length){
        return res.status(404).json({
            status: false,
            message: 'Data Halaqah gagal didapat',
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