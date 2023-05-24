const connection = require('../config/database');
const crypto = require("crypto");

exports.sendEmail = (res, email) => {
  const min = 1000;
  const max = 2000;
  result = Math.random() * (max - min + 1) + min;
  const hash = crypto.createHash('md5').update(result.toString()).digest("hex");
  let formData = {
      generate: hash
  }
  connection.query('UPDATE user SET ? WHERE email ="'+email+'"', formData, function (err, rows) {
    if (err) {
        return res.status(500).json({ message: 'Gagal insert data!', error: err });
    }
  })
};

exports.activeEmail = (res, req) => {
      connection.query('SELECT seq,id_account FROM user WHERE generate="'+req.params.id+'"', function (err, rows) {
      if(!rows.length){
          return res.status(404).json({
              status: false,
              message: 'Aktifasi Tidak dikenali',
          });
      } else if(err) {
        return res.status(500).json({
          message: err.message
        });
      } else {
        var seq = rows[0]['seq'];
        var id_account = rows[0]['id_account'];
          z = '0';
          n = seq + '';
          var result = n.length >= 5 ? n : new Array(5 - n.length + 1).join(z) + n;
        
          var kode_user = 'THFZ'+result;
          
          let formData = {
            status_user: "aktif",
            generate: null,
            kode_user: kode_user,
          }
          connection.query('UPDATE user SET ? WHERE generate ="'+req.params.id+'"', formData, function (err, rows) {
            if (err) {
                return res.status(500).json({message: 'Gagal Aktifasi Email!'});
            } else {
                return res.status(200).send({message: "Akun Berhasil diaktifasi"});
            }
          })
      }
    })
};