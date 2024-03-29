'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('kelas', { 
      id_kelas: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull:false
      },
      nama_kelas: {
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
     await queryInterface.dropTable('kelas');
  }
};
