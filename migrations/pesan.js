'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('pesan', { 
      id_pesan: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull:false
      },
      kode_user_pengirim: {
        type: Sequelize.STRING,
        allowNull:false,
      },
      kode_user_Penerima: {
        type: Sequelize.STRING,
        allowNull:false,
      },
      tgl_pesan: {
        type: Sequelize.DATE,
        allowNull:false,
      },
      judul_pesan: {
        type: Sequelize.STRING,
        allowNull:false,
      },
      id_account: {
        type: Sequelize.STRING,
        allowNull:false,
      },
    });
  },

  async down (queryInterface, Sequelize) {
     await queryInterface.dropTable('pesan');
  }
};
