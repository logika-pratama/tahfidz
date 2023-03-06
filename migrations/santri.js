'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('santri', { 
      id_santri: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull:false
      },
      kode_user: {
        type: Sequelize.STRING,
        allowNull:false,
      },
      nis: {
        type: Sequelize.STRING,
        allowNull:false,
      },
      nama_santri: {
        type: Sequelize.STRING,
        allowNull:false,
      },
      tgl_lahir: {
        type: Sequelize.DATE,
        allowNull:false,
      },
      telp: {
        type: Sequelize.STRING,
        allowNull:false,
      },
      alamat: {
        type: Sequelize.TEXT,
        allowNull:true,
      },
      id_provinsi: {
        type: Sequelize.INTEGER,
        allowNull:false,
      },
      id_kota: {
        type: Sequelize.INTEGER,
        allowNull:false,
      },
      tahun_ajaran: {
        type: Sequelize.INTEGER,
        allowNull:false,
      },
      gol_darah: {
        type: Sequelize.ENUM('A','B','AB','O'),
        allowNull:false,
      },
      id_account: {
        type: Sequelize.STRING,
        allowNull:false,
      },
    });
  },

  async down (queryInterface, Sequelize) {
     await queryInterface.dropTable('santri');
  }
};
