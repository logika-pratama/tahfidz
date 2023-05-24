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
        allowNull:true,
      },
      kode_user_musirf: {
        type: Sequelize.STRING,
        allowNull:true,
      },
      kode_user_santri: {
        type: Sequelize.STRING,
        allowNull:true,
      },
      tgl_pesan_sub: {
        type: Sequelize.DATE,
        allowNull:true,
      },
      judul_pesan_sub: {
        type: Sequelize.STRING,
        allowNull:true,
      },
      read: {
        type: Sequelize.INTEGER,
        allowNull:true,
      },
      id_account: {
        type: Sequelize.STRING,
        allowNull:true,
      },
    });
  },

  async down (queryInterface, Sequelize) {
     await queryInterface.dropTable('pesan_sub');
  }
};
