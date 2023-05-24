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
        allowNull:true,
      },
      kode_halaqah: {
        type: Sequelize.STRING,
        allowNull:true,
      },
      halaqah: {
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
     await queryInterface.dropTable('master_halaqah');
  }
};
