'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('notifications', {
            id: {
                allowNull: false,
                primaryKey: true,
                type: Sequelize.UUID
            },

            notification_text: {
                type: Sequelize.TEXT,
                allowNull: false,
            },
            date_sent: {
                type: Sequelize.DATE,
                allowNull: false,
            },
            is_read: { type: Sequelize.BOOLEAN },
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
        await queryInterface.dropTable('notifications');
    }
};