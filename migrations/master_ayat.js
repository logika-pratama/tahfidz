'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('master_ayat', { 
      id_master_ayat: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull:false
      },
      id_surah: {
        type: Sequelize.INTEGER,
        allowNull:false,
      },
      nomer: {
        type: Sequelize.INTEGER,
        allowNull:false,
      },
      ayat: {
        type: Sequelize.STRING,
        allowNull:false,
      },
    });
  },

  async down (queryInterface, Sequelize) {
     await queryInterface.dropTable('master_ayat');
  }
};
