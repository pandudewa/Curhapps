'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('conseling', {
      id_conseling: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      id_student: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "student",
          key: "id_student",
        }
      },
      id_teacher: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "teacher",
          key: "id_teacher",
        }
      },
      category: {
        type: Sequelize.STRING
      },
      isclosed: {
        type: Sequelize.BOOLEAN
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('conseling');
  }
};