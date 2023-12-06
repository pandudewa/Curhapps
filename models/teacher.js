'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class teacher extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.conseling, {
        foreignKey: 'id_teacher', as: "conseling"
      })
    }
  }
  teacher.init({
    id_teacher:{
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    teacher_name: DataTypes.STRING,
    address: DataTypes.STRING,
    phone: DataTypes.STRING,
    nik: DataTypes.STRING,
    password: DataTypes.STRING,
    photo: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'teacher',
    tableName: 'teacher',
  });
  return teacher;
};