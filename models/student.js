'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class student extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.conseling, {
        foreignKey: 'id_student', as: "conseling"
      })
    }
  }
  student.init({
    id_student:{
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    nis: DataTypes.STRING,
    student_name: DataTypes.STRING,
    address: DataTypes.STRING,
    phone: DataTypes.STRING,
    class: DataTypes.STRING,
    password: DataTypes.STRING,
    photo: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'student',
    tableName: 'student',
  });
  return student;
};