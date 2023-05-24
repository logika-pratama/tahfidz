'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('account', { 
      idaccount: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull:false
      },
      id_account: {
        type: Sequelize.STRING,
        allowNull:true,
      },
      name: {
        type: Sequelize.STRING,
        allowNull:true,
      },
      alamat: {
        type: Sequelize.STRING,
        allowNull:true,
      },
      status_account: {
        type: Sequelize.ENUM('non-aktif','aktif'),
        allowNull:true,
      },
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('acount');
 }
};
