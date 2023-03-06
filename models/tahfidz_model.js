const connection = require('../config/database');
const jwt = require('jsonwebtoken');
const tokenjwt = require('../helper/jwt');

exports.addData = (res, req) => {
    let formData = {
        id_halaqah_santri: req.body.id_halaqah_santri,
        kode_user: req.body.kode_user,
        nilai_tahfidz: req.body.nilai_tahfidz,
        id_surah_from: req.body.id_surah_from,
        ayat_from_first: req.body.ayat_from_first,
        ayat_from_last: req.body.ayat_from_last,
        id_surah_to: req.body.id_surah_to,
        ayat_to_first: req.body.ayat_to_first,
        ayat_to_last: req.body.ayat_to_last,
        mutqin: req.body.mutqin,
        tipe_tahfidz : req.body.tipe_tahfidz,
        tgl_tahfidz	: new Date(),
        komentar_tahfidz : req.body.komentar_tahfidz,
        id_account: req.id_account
    }

        connection.query('INSERT INTO tahfidz SET ?', formData, function (err, rows) {
            if(err){
                return res.status(500).json({
                    status: false,
                    message: 'tahfidz gagal ditambah',
                })
            } else {
                return res.status(201).json({
                    status: true,
                    message: 'tahfidz Berhasil ditambah',
                })
            }
        })
};

exports.editData = (res, req) => {
  let formData = {
    master_tahfidz: req.body.master_tahfidz,
    status_master_tahfidz: req.body.status_master_tahfidz,
    id_tahfidz_kategori: req.body.id_tahfidz_kategori,
    id_account: req.id_account
  }

  connection.query('SELECT COUNT(id_master_tahfidz) as TOTAL FROM master_tahfidz WHERE master_tahfidz ="'+req.body.master_tahfidz+'" AND id_account="'+req.id_account+'" AND id_master_tahfidz<>"'+req.params.id+'"', function (err, rows) {
    if(parseInt(rows[0]['TOTAL']) > 0){
      return res.status(422).json({
          status: false,
          message: 'Kode tahfidz telah digunakan',
      })
    } else {
      connection.query('UPDATE master_tahfidz SET ? WHERE id_master_tahfidz = "'+req.params.id+'"', formData, function (err, rows) {
          if(!rows.length){
              return res.status(404).json({
                  status: false,
                  message: 'tahfidz gagal diubah',
              })
          } else {
              return res.status(201).json({
                  status: true,
                  message: 'tahfidz Berhasil diubah',
              })
          }
      })
    }
  });
};

exports.deleteData = (res, req) => {
  let id = req.params.id;
  connection.query('DELETE FROM tahfidz WHERE id_tahfidz= "'+id+'"', function(err, rows) {
      if (err) {
          return res.status(500).json({
              status: false,
              message: 'tahfidz gagal dihapus',
          })
      } else {
          return res.status(200).json({
              status: true,
              message: 'tahfidz Berhasil dihapus!',
          })
      }
  })
};

exports.readData = (res, req) => {
    connection.query('SELECT * FROM master_tahfidz WHERE id_account="'+req.id_account+'"', function (err, rows) {
        if(!rows.length){
            return res.status(404).json({
                status: false,
                message: 'Data tahfidz gagal didapat',
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
    connection.query('SELECT * FROM master_tahfidz mm\
    LEFT JOIN tahfidz_kategori mk ON mk.id_tahfidz_kategori = mm.id_tahfidz_kategori\
    WHERE mm.id_account="'+req.id_account+'" ORDER BY mm.urutan ASC\
    ', function (err, rows) {
        if(!rows.length){
            return res.status(404).json({
                status: false,
                message: 'Data tahfidz gagal didapat',
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
    const currentYear = todaysDate.getFullYear();

    connection.query('SELECT *,(SELECT COUNT(*) FROM tahfidz WHERE kode_user = hss.kode_user AND DATE(tgl_tahfidz) = "'+date+'") AS TOTAL FROM halaqah_santri_sub hss\
    LEFT JOIN santri s ON s.kode_user = hss.kode_user\
    WHERE hss.id_master_halaqah="'+req.params.id+'" AND hss.id_account="'+req.id_account+'" AND hss.tahun_halaqah_santri_sub="'+currentYear+'"', function (err, rows) {
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
const todaysDate = new Date();
const date = new Date().toLocaleDateString('en-CA');
  connection.query('SELECT *,DATE_FORMAT(tgl_tahfidz, "%H:%i") as time,(SELECT surah FROM master_surah WHERE id_master_surah = t.id_surah_to) AS surat2, mm.surah as surat1 FROM tahfidz t \
  LEFT JOIN master_surah mm ON mm.id_master_surah = t.id_surah_from\
  WHERE t.kode_user ="'+req.params.id+'" AND DATE(t.tgl_tahfidz) = "'+date+'" AND t.id_account="'+req.id_account+'"', function (err, rows) {
      if(err){
        return res.status(500).json({
            status: false,
            message: 'Data tahfidz gagal didapat',
        })
      }

      if(!rows.length){
          return res.status(404).json({
              status: false,
              message: 'Data tahfidz gagal didapat',
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