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
        allowNull:true,
      },
      email: {
        type: Sequelize.STRING,
        allowNull:true,
      },
      username: {
        type: Sequelize.STRING,
        allowNull:true,
      },
      password: {
        type: Sequelize.STRING,
        allowNull:true,
      },
      token: {
        type: Sequelize.STRING,
        allowNull:true,
      },
      date_login: {
        type: Sequelize.DATE,
        allowNull:true,
      },
      status_login: {
        type: Sequelize.ENUM('offline', 'online'),
        allowNull:true,
      },
      generate: {
        type: Sequelize.STRING,
        allowNull:true,
      },
      status_user: {
        type: Sequelize.ENUM('non-aktif','aktif'),
        allowNull:true,
      },
      hakakses_user: {
        type: Sequelize.ENUM('musrif','santri','admin','superadmin'),
        allowNull:true,
      },
      seq: {
        type: Sequelize.INTEGER,
        allowNull:true,
      },
      id_account: {
        type: Sequelize.STRING,
        allowNull:true,
      },
    });
  },

  async down (queryInterface, Sequelize) {
     await queryInterface.dropTable('users');
  }
};
