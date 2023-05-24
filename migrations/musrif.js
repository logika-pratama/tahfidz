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
        allowNull:true,
      },
      nama_musrif: {
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
      instansi: {
        type: Sequelize.TEXT,
        allowNull:true,
      },
      pendidikan: {
        type: Sequelize.STRING,
        allowNull:true,
      },
      hafalan: {
        type: Sequelize.STRING,
        allowNull:true,
      },
      gol_darah: {
        type: Sequelize.ENUM('A','B','AB','O'),
        allowNull:true,
      },
      hakakses_musrif: {
        type: Sequelize.ENUM('musrif','super_musrif'),
        allowNull:true,
      },
      status_musrif: {
        type: Sequelize.ENUM('non-akitf','akitf'),
        allowNull:true,
      },
      id_account: {
        type: Sequelize.STRING,
        allowNull:true,
      },
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('musrif');
  }
};
