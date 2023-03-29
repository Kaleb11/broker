'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('plans', {
            id: {
                allowNull: false,
                primaryKey: true,
                type: Sequelize.UUID
            },
            user_id: {
                type: Sequelize.UUID,
                allowNull: false,
                references: {
                    model: 'users',
                    key: 'id'
                },
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE'
            },
            start_date: {
                type: Sequelize.DATE,
                allowNull: false
            },
            expiration_date: {
                type: Sequelize.DATE,
                allowNull: false,
            },
            price: {
                type: Sequelize.INTEGER,
                allowNull: false
            },
            total_duration_day: {
                type: Sequelize.INTEGER,
                allowNull: false
            },
            left_day: {
                type: Sequelize.INTEGER,
                allowNull: false
            },
            status: { type: Sequelize.STRING, allowNull: false },
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
        await queryInterface.dropTable('plans');
    }
};