const connection = require('../config/database');
const jwt = require('jsonwebtoken');
const tokenjwt = require('../helper/jwt');

exports.addData = (res, req) => {
    let formData = {
        master_mutabaah: req.body.master_mutabaah,
        status_master_mutabaah: req.body.status_master_mutabaah,
        id_mutabaah_kategori: req.body.id_mutabaah_kategori,
        id_account: req.id_account
    }

    connection.query('SELECT COUNT(master_mutabaah) as TOTAL FROM master_mutabaah WHERE master_mutabaah="'+req.body.master_mutabaah+'" AND id_account="'+req.id_account+'"', function (err, rows) {
      if(parseInt(rows[0]['TOTAL']) > 0){
        return res.status(422).json({
            status: false,
            message: 'Kode Mutabaah telah digunakan',
        })
      } else {
        connection.query('INSERT INTO master_mutabaah SET ?', formData, function (err, rows) {
            if(err){
                return res.status(500).json({
                    status: false,
                    message: err.message,
                })
            } else {
                return res.status(201).json({
                    status: true,
                    message: 'Mutabaah Berhasil ditambah',
                })
            }
        })
      }
    });
};

exports.editData = (res, req) => {
  let formData = {
    master_mutabaah: req.body.master_mutabaah,
    status_master_mutabaah: req.body.status_master_mutabaah,
    id_mutabaah_kategori: req.body.id_mutabaah_kategori,
    id_account: req.id_account
  }

  connection.query('SELECT COUNT(id_master_mutabaah) as TOTAL FROM master_mutabaah WHERE master_mutabaah ="'+req.body.master_mutabaah+'" AND id_account="'+req.id_account+'" AND id_master_mutabaah<>"'+req.params.id+'"', function (err, rows) {
    if(parseInt(rows[0]['TOTAL']) > 0){
      return res.status(422).json({
          status: false,
          message: 'Kode Mutabaah telah digunakan',
      })
    } else {
      connection.query('UPDATE master_mutabaah SET ? WHERE id_master_mutabaah = "'+req.params.id+'"', formData, function (err, rows) {
        if(err){
            return res.status(500).json({
                status: false,
                message: err.message,
            })
        }
        if(!rows.length){
            return res.status(404).json({
                status: false,
                message: 'Mutabaah gagal diubah',
            })
        } else {
            return res.status(201).json({
                status: true,
                message: 'Mutabaah Berhasil diubah',
            })
        }
      })
    }
  });
};

exports.deleteData = (res, req) => {
  let id = req.params.id;
  connection.query('DELETE FROM master_mutabaah WHERE id_master_mutabaah= "'+id+'" AND id_account = "'+req.id_account+'"', function(err, rows) {
      if (err) {
          return res.status(500).json({
              status: false,
              message: 'Mutabaah gagal dihapus',
          })
      } else {
          return res.status(200).json({
              status: true,
              message: 'Mutabaah Berhasil dihapus!',
          })
      }
  })
};

exports.readData = (res, req) => {
    connection.query('SELECT * FROM master_mutabaah WHERE id_account="'+req.id_account+'"', function (err, rows) {
        if(err){
            return res.status(500).json({
                status: false,
                message: err.message,
            })
        }
        if(!rows.length){
            return res.status(404).json({
                status: false,
                message: 'Data Mutabaah gagal didapat',
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

exports.readDataList = (res, req) => {
    connection.query('SELECT * FROM master_mutabaah mm\
    LEFT JOIN mutabaah_kategori mk ON mk.id_mutabaah_kategori = mm.id_mutabaah_kategori\
    WHERE mm.id_account="'+req.id_account+'" ORDER BY mm.urutan ASC\
    ', function (err, rows) {
        if(err){
            return res.status(500).json({
                status: false,
                message: err.message,
            })
        }
        if(!rows.length){
            return res.status(404).json({
                status: false,
                message: 'Data Mutabaah gagal didapat',
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

exports.readDataListDetail = (res, req) => {
    bulan = ('0' + (req.params.month)).slice(-2);
    date2 = req.params.year+'-'+bulan+'-'+req.params.day;
    connection.query('SELECT * FROM master_mutabaah mm \
    LEFT JOIN mutabaah_kategori mk ON mk.id_mutabaah_kategori = mm.id_mutabaah_kategori \
    LEFT JOIN mutabaah m ON m.id_master_mutabaah = mm.id_master_mutabaah AND m.kode_user ="'+req.kode_user+'" AND DATE(m.tgl_mutabaah) = "'+date2+'"\
    WHERE mm.id_account="'+req.id_account+'" \
    GROUP BY mm.id_master_mutabaah \
    ORDER BY mm.urutan ASC \
    ', function (err, rows) {
        if(err){
            return res.status(500).json({
                status: false,
                message: err.message,
            })
        }
        if(!rows.length){
            return res.status(404).json({
                status: false,
                message: 'Data Mutabaah gagal didapat',
            })
        } else {
            return res.status(201).json({
                status: true,
                message: 'success',
                data:rows,
                tgl:date2,
            })
        }
    })
};

exports.detailData = (res, req) => {
  connection.query('SELECT * FROM master_mutabaah WHERE id_master_mutabaah ="'+req.params.id+'" AND id_account="'+req.id_account+'"', function (err, rows) {
    if(err){
        return res.status(500).json({
            status: false,
            message: err.message,
        })
    }
    if(!rows.length){
        return res.status(404).json({
            status: false,
            message: 'Data Mutabaah gagal didapat',
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