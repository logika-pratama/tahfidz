'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('halaqah_santri', { 
      id_halaqah_santri: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull:false
      },
      id_master_halaqah: {
        type: Sequelize.INTEGER,
        allowNull:false,
      },
      kode_user: {
        type: Sequelize.STRING,
        allowNull:false,
      },
      tahun_halaqah: {
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
     await queryInterface.dropTable('halaqah_santri');
  }
};
