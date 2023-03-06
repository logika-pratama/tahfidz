'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('halaqah_santri_sub', { 
      id_halaqah_santri_sub: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull:false
      },
      id_master_halaqah: {
        type: Sequelize.STRING,
        allowNull:false,
      },
      kode_user: {
        type: Sequelize.STRING,
        allowNull:false,
      },
      tahun_halaqah_santri_sub: {
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
     await queryInterface.dropTable('halaqah_santri_sub');
  }
};
