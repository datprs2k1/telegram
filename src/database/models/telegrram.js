'use strict';
const { Model } = require('sequelize');
const sequelizePaginate = require('sequelize-paginate');
const bcrypt = require('bcryptjs');
module.exports = (sequelize, DataTypes) => {
  class Telegram extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {}
  }

  sequelizePaginate.paginate(Telegram);
  Telegram.init(
    {
      uid: {
        type: DataTypes.BIGINT,
        allowNull: false,
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      phone: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      string_session: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'Telegram',
      tableName: 'telegrams',
    }
  );
  return Telegram;
};
