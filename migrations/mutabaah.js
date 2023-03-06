'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('mutabaah', { 
      id_mutabaah: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull:false
      },
      id_master_mutabaah: {
        type: Sequelize.INTEGER,
        allowNull:false,
      },
      nilai: {
        type: Sequelize.INTEGER,
        allowNull:false,
      },
      tgl_mutabaah: {
        type: Sequelize.DATE,
        allowNull:false,
      },
      id_account: {
        type: Sequelize.STRING,
        allowNull:false,
      },
    });
  },

  async down (queryInterface, Sequelize) {
     await queryInterface.dropTable('mutabaah');
  }
};
