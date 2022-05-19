'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Alumnis', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      fullname: {
        allowNull: false,
        type: Sequelize.TEXT
      },
      password: {
        allowNull: false,
        type: Sequelize.STRING
      },
      born_date: {
        allowNull: false,
        type: Sequelize.DATE
      },
      nik: {
        allowNull: false,
        unique: true,
        type: Sequelize.STRING
      },
      nim: {
        allowNull: false,
        unique: true,
        type: Sequelize.STRING
      },
      address: {
        allowNull: false,
        type: Sequelize.TEXT
      },
      major_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'Majors',
          key: 'id'
        }
      },
      telephone_number: {
        allowNull: false,
        type: Sequelize.STRING
      },
      year_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'Years',
          key: 'id'
        }
      },
      role_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'Roles',
          key: 'id'
        }
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
    await queryInterface.dropTable('Alumnis');
  }
};