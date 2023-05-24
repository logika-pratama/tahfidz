const connection = require('../config/database');
const jwt = require('jsonwebtoken');
const tokenjwt = require('../helper/jwt');

exports.addData = (res, req) => {
    let formData = {
        id_master_halaqah: req.body.id_master_halaqah,
        kode_user: req.body.kode_user,
        tahun_halaqah: req.body.tahun_halaqah,
    }

    connection.query('SELECT COUNT(id_master_halaqah) as TOTAL FROM halaqah_santri WHERE kode_user="'+req.body.kode_user+'" AND tahun_halaqah="'+req.body.tahun_halaqah+'"', function (err, rows) {
      if(parseInt(rows[0]['TOTAL']) > 0){
        return res.status(422).json({
            status: false,
            message: 'Kode halaqah musrif telah digunakan',
        })
      } else {
        connection.query('INSERT INTO halaqah_santri SET ?', formData, function (err, rows) {
            if(err){
                return res.status(500).json({
                    status: false,
                    message: err.message,
                })
            } else {
                return res.status(201).json({
                    status: true,
                    message: 'halaqah musrif Berhasil ditambah',
                })
            }
        })
      }
    });
};

exports.editData = (res, req) => {
  let formData = {
    id_master_halaqah: req.body.id_master_halaqah,
    kode_user: req.body.kode_user,
    tahun_halaqah: req.body.tahun_halaqah,
  }

  connection.query('SELECT COUNT(id_halaqah_santri) as TOTAL FROM halaqah_santri WHERE nama_halaqah_santri ="'+req.body.nama_halaqah_santri+'" AND id_account="'+req.id_account+'" AND id_halaqah_santri<>"'+req.params.id+'"', function (err, rows) {
    if(parseInt(rows[0]['TOTAL']) > 0){
      return res.status(422).json({
          status: false,
          message: 'Kode halaqah_santri telah digunakan',
      })
    } else {
      connection.query('UPDATE halaqah_santri SET ? WHERE id_halaqah_santri = "'+req.params.id+'"', formData, function (err, rows) {
          if(err){
              return res.status(404).json({
                  status: false,
                  message: err.message,
              })
          } else {
              return res.status(201).json({
                  status: true,
                  message: 'halaqah musrif Berhasil diubah',
              })
          }
      })
    }
  });
};

exports.deleteData = (res, req) => {
  let id = req.params.id;
  connection.query('DELETE FROM halaqah_santri WHERE id_halaqah_santri= "'+id+'" AND id_account = "'+req.id_account+'"', function(err, rows) {
      if (err) {
          return res.status(500).json({
              status: false,
              message: 'halaqah musrif gagal dihapus',
          })
      } else {
          return res.status(200).json({
              status: true,
              message: 'halaqah musrif Berhasil dihapus!',
          })
      }
  })
};

exports.readData = (res, req) => {
    connection.query('SELECT * FROM halaqah_santri WHERE id_account="'+req.id_account+'"', function (err, rows) {
        if(err){
            return res.status(500).json({
                status: false,
                message: err.message,
            })
        }
        if(!rows.length){
            return res.status(404).json({
                status: false,
                message: 'Data halaqah musrif gagal didapat',
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

exports.readDataMustrif = (res, req) => {
    const todaysDate = new Date()
    const currentYear = todaysDate.getFullYear()
    connection.query('SELECT * FROM halaqah_santri hs\
    LEFT JOIN master_halaqah mh ON mh.id_master_halaqah = hs.id_master_halaqah\
    WHERE hs.kode_user="'+req.kode_user+'" AND hs.id_account="'+req.id_account+'" AND hs.tahun_halaqah="'+currentYear+'"', function (err, rows) {
        if(err){
            return res.status(500).json({
                status: false,
                message: err.message,
            })
        }
        if(!rows.length){
            return res.status(404).json({
                status: false,
                message: 'Data halaqah musrif gagal didapat',
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

exports.readDataSantri = (res, req) => {
    const todaysDate = new Date();
    const date = new Date().toLocaleDateString('en-CA');
    const currentYear = todaysDate.getFullYear()
    connection.query('SELECT *,(SELECT COUNT(*) FROM mutabaah WHERE kode_user = hss.kode_user AND DATE(tgl_mutabaah) = "'+date+'") AS TOTAL FROM halaqah_santri_sub hss\
    LEFT JOIN master_halaqah mh ON mh.id_master_halaqah = hss.id_master_halaqah\
    LEFT JOIN santri s ON s.kode_user = hss.kode_user\
    WHERE hss.id_master_halaqah="'+req.params.id+'" AND hss.id_account="'+req.id_account+'" AND hss.tahun_halaqah_santri_sub="'+currentYear+'"', function (err, rows) {
        if(err){
            return res.status(500).json({
                status: false,
                message: err.message,
            })
        }
        if(!rows.length){
            return res.status(404).json({
                status: false,
                message: 'Data halaqah musrif gagal didapat',
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
  connection.query('SELECT * FROM halaqah_santri WHERE id_halaqah_santri ="'+req.params.id+'" AND id_account="'+req.id_account+'"', function (err, rows) {
    if(err){
        return res.status(500).json({
            status: false,
            message: err.message,
        })
    }
    if(!rows.length){
        return res.status(404).json({
            status: false,
            message: 'Data halaqah musrif gagal didapat',
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