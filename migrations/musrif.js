'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up (queryInterface, Sequelize) {
    await queryInterface.createTable('musrif', { 
      id_musrif: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull:false
      },
      kode_user: {
        type: Sequelize.STRING,
        allowNull:false,
      },
      nama_musrif: {
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
      instansi: {
        type: Sequelize.TEXT,
        allowNull:false,
      },
      pendidikan: {
        type: Sequelize.STRING,
        allowNull:false,
      },
      hafalan: {
        type: Sequelize.STRING,
        allowNull:false,
      },
      gol_darah: {
        type: Sequelize.ENUM('A','B','AB','O'),
        allowNull:false,
      },
      hakakses_musrif: {
        type: Sequelize.ENUM('musrif','super_musrif'),
        allowNull:false,
      },
      status_musrif: {
        type: Sequelize.ENUM('non-akitf','akitf'),
        allowNull:false,
      },
      id_account: {
        type: Sequelize.STRING,
        allowNull:false,
      },
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('musrif');
  }
};
