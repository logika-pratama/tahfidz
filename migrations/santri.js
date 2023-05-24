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
        allowNull:true,
      },
      nis: {
        type: Sequelize.STRING,
        allowNull:true,
      },
      nama_santri: {
        type: Sequelize.STRING,
        allowNull:true,
      },
      tgl_lahir: {
        type: Sequelize.DATE,
        allowNull:true,
      },
      telp: {
        type: Sequelize.STRING,
        allowNull:true,
      },
      alamat: {
        type: Sequelize.TEXT,
        allowNull:true,
      },
      id_provinsi: {
        type: Sequelize.INTEGER,
        allowNull:true,
      },
      id_kota: {
        type: Sequelize.INTEGER,
        allowNull:true,
      },
      tahun_ajaran: {
        type: Sequelize.INTEGER,
        allowNull:true,
      },
      gol_darah: {
        type: Sequelize.ENUM('A','B','AB','O'),
        allowNull:true,
      },
      id_account: {
        type: Sequelize.STRING,
        allowNull:true,
      },
    });
  },

  async down (queryInterface, Sequelize) {
     await queryInterface.dropTable('santri');
  }
};
