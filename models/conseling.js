'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class conseling extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.student)
      this.belongsTo(models.teacher)
      this.hasMany(models.offline, {
        foreignKey: 'id_conseling', as: "offline"
      })
      this.hasMany(models.online, {
        foreignKey: 'id_conseling', as: "online"
      })
      this.hasMany(models.counseling_result, {
        foreignKey: 'id_conseling', as: "counseling_result"
      })
    }
  }
  conseling.init({
    id_conseling:{
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    id_student: DataTypes.INTEGER,
    id_teacher: DataTypes.INTEGER,
    category: DataTypes.STRING,
    isclosed: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'conseling',
    tableName: 'conseling',
  });
  return conseling;
};