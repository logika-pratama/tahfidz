'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('log', { 
      id_log: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull:false
      },
      kode_user: {
        type: Sequelize.STRING,
        allowNull:false,
      },
      nama_user: {
        type: Sequelize.STRING,
        allowNull:false,
      },
      table: {
        type: Sequelize.STRING,
        allowNull:false,
      },
      status: {
        type: Sequelize.FLOAT,
        allowNull:false,
      },
      logid: {
        type: Sequelize.STRING,
        allowNull:false,
      },
      payload: {
        type: Sequelize.STRING,
        allowNull:false,
      },
      time: {
        type: Sequelize.DATE,
        allowNull:false,
      },
    });
  },

  async down (queryInterface, Sequelize) {
     await queryInterface.dropTable('log');
  }
};
