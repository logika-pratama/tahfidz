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
        allowNull:true,
      },
      kode_user: {
        type: Sequelize.STRING,
        allowNull:true,
      },
      nilai_tahfidz: {
        type: Sequelize.INTEGER,
        allowNull:true,
      },
      id_surah_from: {
        type: Sequelize.INTEGER,
        allowNull:true,
      },
      ayat_from_first: {
        type: Sequelize.INTEGER,
        allowNull:true,
      },
      ayat_from_last: {
        type: Sequelize.INTEGER,
        allowNull:true,
      },
      id_surah_to: {
        type: Sequelize.INTEGER,
        allowNull:true,
      },
      ayat_to_first: {
        type: Sequelize.INTEGER,
        allowNull:true,
      },
      ayat_to_last: {
        type: Sequelize.INTEGER,
        allowNull:true,
      },
      mutqin: {
        type: Sequelize.INTEGER,
        allowNull:true,
      },
      id_kategori_tahfidz: {
        type: Sequelize.INTEGER,
        allowNull:true,
      },
      tgl_tahfidz: {
        type: Sequelize.DATE,
        allowNull:true,
      },
      komentar_tahfidz: {
        type: Sequelize.TEXT,
        allowNull:true,
      },
      id_account: {
        type: Sequelize.STRING,
        allowNull:true,
      },
    });
  },

  async down (queryInterface, Sequelize) {
     await queryInterface.dropTable('tahfidz');
  }
};
