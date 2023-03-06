'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('user', { 
      id_user: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull:false
      },
      kode_user: {
        type: Sequelize.STRING,
        allowNull:false,
      },
      email: {
        type: Sequelize.STRING,
        allowNull:false,
      },
      username: {
        type: Sequelize.STRING,
        allowNull:false,
      },
      password: {
        type: Sequelize.STRING,
        allowNull:false,
      },
      token: {
        type: Sequelize.STRING,
        allowNull:true,
      },
      date_login: {
        type: Sequelize.DATE,
        allowNull:false,
      },
      status_login: {
        type: Sequelize.ENUM('offline', 'online'),
        allowNull:false,
      },
      generate: {
        type: Sequelize.STRING,
        allowNull:false,
      },
      status_user: {
        type: Sequelize.ENUM('non-aktif','aktif'),
        allowNull:false,
      },
      hakakses_user: {
        type: Sequelize.ENUM('musrif','santri','admin','superadmin'),
        allowNull:false,
      },
      seq: {
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
     await queryInterface.dropTable('users');
  }
};
