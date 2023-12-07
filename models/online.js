'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class online extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.conseling,{
        foreignKey:'id_conseling', as: "conseling"
      })
    }
  }
  online.init({
    id_online:{
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    id_conseling: DataTypes.INTEGER,
    id_user: DataTypes.INTEGER,
    tipe_user: DataTypes.ENUM('student', 'teacher'),
    counseling: DataTypes.TEXT,
    // isclosed: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'online',
    tableName: 'online',
  });
  return online;
};