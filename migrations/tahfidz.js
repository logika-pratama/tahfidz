'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('tahfidz', { 
      id_tahfidz: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull:false
      },
      id_halaqah_santri: {
        type: Sequelize.INTEGER,
        allowNull:false,
      },
      kode_user: {
        type: Sequelize.STRING,
        allowNull:false,
      },
      nilai_tahfidz: {
        type: Sequelize.INTEGER,
        allowNull:false,
      },
      id_surah_from: {
        type: Sequelize.INTEGER,
        allowNull:false,
      },
      ayat_from_first: {
        type: Sequelize.INTEGER,
        allowNull:false,
      },
      ayat_from_last: {
        type: Sequelize.INTEGER,
        allowNull:false,
      },
      id_surah_to: {
        type: Sequelize.INTEGER,
        allowNull:false,
      },
      ayat_to_first: {
        type: Sequelize.INTEGER,
        allowNull:false,
      },
      ayat_to_last: {
        type: Sequelize.INTEGER,
        allowNull:false,
      },
      mutqin: {
        type: Sequelize.INTEGER,
        allowNull:false,
      },
      id_kategori_tahfidz: {
        type: Sequelize.INTEGER,
        allowNull:false,
      },
      tgl_tahfidz: {
        type: Sequelize.DATE,
        allowNull:false,
      },
      komentar_tahfidz: {
        type: Sequelize.TEXT,
        allowNull:false,
      },
      id_account: {
        type: Sequelize.STRING,
        allowNull:false,
      },
    });
  },

  async down (queryInterface, Sequelize) {
     await queryInterface.dropTable('tahfidz');
  }
};
