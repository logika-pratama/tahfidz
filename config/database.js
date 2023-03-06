require('dotenv').config();
const {
  DB_USERNAME,
  DB_PASSWORD,
  DB_HOSTNAME,
  DB_NAME,
  DB_DIALECT,
} = process.env;

let mysql = require('mysql');

let connection = mysql.createConnection({
   host:        DB_HOSTNAME,
   user:        DB_USERNAME,
   password:    '',
   database:    DB_NAME
 });

connection.connect(function(error){
   if(!!error){
     console.log(error);
   }else{
     console.log('Connection Succuessfully!');
   }

   if (error) throw error;
  console.log("Connected!");
 })


module.exports = connection; 