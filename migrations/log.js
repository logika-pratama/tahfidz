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
        allowNull:true,
      },
      nama_user: {
        type: Sequelize.STRING,
        allowNull:true,
      },
      table: {
        type: Sequelize.STRING,
        allowNull:true,
      },
      status: {
        type: Sequelize.FLOAT,
        allowNull:true,
      },
      logid: {
        type: Sequelize.STRING,
        allowNull:true,
      },
      payload: {
        type: Sequelize.STRING,
        allowNull:true,
      },
      time: {
        type: Sequelize.DATE,
        allowNull:true,
      },
    });
  },

  async down (queryInterface, Sequelize) {
     await queryInterface.dropTable('log');
  }
};
