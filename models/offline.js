'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class offline extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.conseling)
    }
  }
  offline.init({
    id_offline:{
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    id_conseling: DataTypes.INTEGER, unique: true,
    aproval: DataTypes.BOOLEAN,
    meeting_date: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'offline',
    tableName: 'offline',
  });
  return offline;
};