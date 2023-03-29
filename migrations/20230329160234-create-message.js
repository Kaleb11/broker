'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('messsages', {
            id: {
                allowNull: false,
                primaryKey: true,
                type: Sequelize.UUID
            },

            message_text: {
                type: Sequelize.TEXT,
                allowNull: false
            },
            sender_id: {
                type: Sequelize.UUID,
                allowNull: false,
                references: {
                    model: 'users',
                    key: 'id'
                },
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE'
            },
            recipent_id: {
                type: Sequelize.UUID,
                allowNull: false,
                references: {
                    model: 'users',
                    key: 'id'
                },
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE'
            },
            date_sent: {
                type: Sequelize.DATE,
                allowNull: false
            },
            is_read: { type: Sequelize.BOOLEAN, allowNull: false, },
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
        await queryInterface.dropTable('messsages');
    }
};