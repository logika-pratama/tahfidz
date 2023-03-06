'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('master_halaqah', { 
      id_master_halaqah: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull:false
      },
      id_kelas: {
        type: Sequelize.INTEGER,
        allowNull:false,
      },
      kode_halaqah: {
        type: Sequelize.STRING,
        allowNull:false,
      },
      halaqah: {
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
     await queryInterface.dropTable('master_halaqah');
  }
};
