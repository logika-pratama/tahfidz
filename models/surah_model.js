const connection = require('../config/database');
const jwt = require('jsonwebtoken');
const tokenjwt = require('../helper/jwt');

exports.list = (res, req) => {
    connection.query('SELECT * FROM master_surah ORDER BY id_master_surah ASC', function (err, rows) {
        if(err){
            return res.status(500).json({
                status: false,
                message: 'Terjadi Error pada server',
            })
        }

        if(!rows.length){
            return res.status(404).json({
                status: false,
                message: 'Data Al Quran gagal didapat',
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

exports.detail = (res, req) => {
    connection.query('SELECT * FROM master_surah WHERE id_master_surah = "'+req.params.id+'" ORDER BY id_master_surah ASC LIMIT 1', function (err, rows) {
        if(err){
            return res.status(500).json({
                status: false,
                message: 'Terjadi Error pada server',
            })
        }

        if(!rows.length){
            return res.status(404).json({
                status: false,
                message: 'Data Al Quran gagal didapat',
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