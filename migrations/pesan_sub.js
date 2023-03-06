'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('pesan_sub', { 
      id_pesan_sub: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull:false
      },
      id_pesan: {
        type: Sequelize.INTEGER,
        allowNull:false,
      },
      kode_user_musirf: {
        type: Sequelize.STRING,
        allowNull:false,
      },
      kode_user_santri: {
        type: Sequelize.STRING,
        allowNull:false,
      },
      tgl_pesan_sub: {
        type: Sequelize.DATE,
        allowNull:false,
      },
      judul_pesan_sub: {
        type: Sequelize.STRING,
        allowNull:false,
      },
      read: {
        type: Sequelize.INTEGER,
        allowNull:false,
      },
      id_account: {
        type: Sequelize.STRING,
        allowNull:false,
      },
    });
  },

  async down (queryInterface, Sequelize) {
     await queryInterface.dropTable('pesan_sub');
  }
};
