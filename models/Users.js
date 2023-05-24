module.exports = (sequelize, DataType) => {
  const Users = sequelize.define(
    'Users', {
      id_user: {
        type: DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull:true
      },
      kode_user: {
        type: DataType.STRING,
        allowNull:true,
      },
      email: {
        type: DataType.STRING,
        allowNull:true,
      },
      username: {
        type: DataType.STRING,
        allowNull:true,
      },
      password: {
        type: DataType.STRING,
        allowNull:true,
      },
      token: {
        type: DataType.STRING,
        allowNull:true,
      },
      date_login: {
        type: DataType.DATE,
        allowNull:true,
      },
      status_login: {
        type: DataType.ENUM('offline', 'online'),
        allowNull:true,
      },
      generate: {
        type: DataType.STRING,
        allowNull:true,
      },
      status_user: {
        type: DataType.ENUM('non-aktif','aktif'),
        allowNull:true,
      },
      status_login: {
        type: DataType.ENUM('non-aktif','aktif'),
        allowNull:true,
      },
      hakakses: {
        type: DataType.ENUM('musrif','santri','admin','superadmin'),
        allowNull:true,
      },
      seq: {
        type: DataType.INTEGER,
        allowNull:true,
      },
      id_account: {
        type: DataType.STRING,
        allowNull:true,
      }
    }, {
      tableName : 'user'
    });

    return Users;
}