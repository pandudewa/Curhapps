'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('online', {
      id_online: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      id_conseling: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "conseling",
          key: "id_conseling",
        }
      },
      id_user: {
        type: Sequelize.INTEGER
      },
      tipe_user: {
        type: Sequelize.ENUM('student', 'teacher')
      },
      counseling: {
        type: Sequelize.TEXT
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
    await queryInterface.dropTable('online');
  }
};