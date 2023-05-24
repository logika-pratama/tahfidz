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
        allowNull:true,
      },
      status_master_mutabaah: {
        type: Sequelize.STRING,
        allowNull:true,
      },
      id_mutabaah_kategori: {
        type: Sequelize.INTEGER,
        allowNull:true,
      },
      urutan: {
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
     await queryInterface.dropTable('master_mutabaah');
  }
};
