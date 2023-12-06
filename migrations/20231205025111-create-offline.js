'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('offline', {
      id_offline: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      id_conseling: {
        type: Sequelize.INTEGER,
        allowNull: false,
        unique: true,
        references: {
          model: "conseling",
          key: "id_conseling",
        }
      },
      aproval: {
        type: Sequelize.BOOLEAN,
        default: null
      },
      meeting_date: {
        type: Sequelize.DATE
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
    await queryInterface.dropTable('offline');
  }
};