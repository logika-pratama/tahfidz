const connection = require('../config/database');
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const jwt = require('jsonwebtoken');
const var_dump = require('var_dump')
const tokenjwt = require('../helper/jwt');

exports.getCount = (res, req, next) => {
  connection.query('SELECT Count(id_halaqah_santri) AS count_halaqah \
    FROM halaqah_santri hs \
    WHERE hs.kode_user = "'+req.kode_user+'" \
  ', function (err, rows) {
      ch = rows[0]['count_halaqah'];
      connection.query('SELECT Count(hs.id_halaqah_santri) AS count_santri \
          FROM halaqah_santri_sub hss \
          LEFT JOIN halaqah_santri hs ON hs.id_master_halaqah = hss.id_master_halaqah \
          WHERE hs.kode_user = "'+req.kode_user+'" \
        ', function (err, rows) {
            cs = rows[0]['count_santri'];
            return res.status(201).json({
              status : true,
              message : 'success',
              count_halaqah : ch,
              count_santri : cs,
          })
    });
  });
}

  
exports.getHistoryTahfidz = (res, req, next) => {
  connection.query('SELECT * FROM tahfidz t\
      LEFT JOIN surah s ON t.id_surah_from = s.id_master_surah \
      WHERE kode_user = "'+req.kode_user+'" \
    ', function (err, rows) {
      return res.status(201).json({
        status : true,
        message : 'success',
      });
  });
};