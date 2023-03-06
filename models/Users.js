module.exports = (sequelize, DataType) => {
  const Users = sequelize.define(
    'Users', {
      id_user: {
        type: DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull:false
      },
      kode_user: {
        type: DataType.STRING,
        allowNull:false,
      },
      email: {
        type: DataType.STRING,
        allowNull:false,
      },
      username: {
        type: DataType.STRING,
        allowNull:false,
      },
      password: {
        type: DataType.STRING,
        allowNull:false,
      },
      token: {
        type: DataType.STRING,
        allowNull:true,
      },
      date_login: {
        type: DataType.DATE,
        allowNull:false,
      },
      status_login: {
        type: DataType.ENUM('offline', 'online'),
        allowNull:false,
      },
      generate: {
        type: DataType.STRING,
        allowNull:false,
      },
      status_user: {
        type: DataType.ENUM('non-aktif','aktif'),
        allowNull:false,
      },
      status_login: {
        type: DataType.ENUM('non-aktif','aktif'),
        allowNull:false,
      },
      hakakses: {
        type: DataType.ENUM('musrif','santri','admin','superadmin'),
        allowNull:false,
      },
      seq: {
        type: DataType.INTEGER,
        allowNull:false,
      },
      id_account: {
        type: DataType.STRING,
        allowNull:false,
      }
    }, {
      tableName : 'user'
    });

    return Users;
}