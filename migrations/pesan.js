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
        allowNull:true,
      },
      kode_user_Penerima: {
        type: Sequelize.STRING,
        allowNull:true,
      },
      tgl_pesan: {
        type: Sequelize.DATE,
        allowNull:true,
      },
      judul_pesan: {
        type: Sequelize.STRING,
        allowNull:true,
      },
      id_account: {
        type: Sequelize.STRING,
        allowNull:true,
      },
    });
  },

  async down (queryInterface, Sequelize) {
     await queryInterface.dropTable('pesan');
  }
};
