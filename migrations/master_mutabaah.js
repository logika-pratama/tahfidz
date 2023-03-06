'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('master_mutabaah', { 
      id_master_mutabaah: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull:false
      },
      master_mutabaah: {
        type: Sequelize.STRING,
        allowNull:false,
      },
      status_master_mutabaah: {
        type: Sequelize.STRING,
        allowNull:false,
      },
      id_mutabaah_kategori: {
        type: Sequelize.INTEGER,
        allowNull:false,
      },
      urutan: {
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
     await queryInterface.dropTable('master_mutabaah');
  }
};
