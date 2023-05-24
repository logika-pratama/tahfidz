'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('tahfidz_sub', { 
      id_tahfidz_sub: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull:false
      },
      id_tahfidz: {
        type: Sequelize.INTEGER,
        allowNull:true,
      },
      id_master_ayat: {
        type: Sequelize.STRING,
        allowNull:true,
      },
    });
  },

  async down (queryInterface, Sequelize) {
     await queryInterface.dropTable('tahfidz_sub');
  }
};
