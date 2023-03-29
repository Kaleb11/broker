'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('itemimages', {
            id: {
                allowNull: false,
                primaryKey: true,
                type: Sequelize.UUID
            },

            url: {
                type: Sequelize.TEXT
            },
            item_id: {
                type: Sequelize.UUID,
                allowNull: false,
                references: {
                    model: 'item',
                    key: 'id'
                },
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE'
            },
            is_primary: { type: Sequelize.BOOLEAN, allowNull: false, },
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
        await queryInterface.dropTable('itemimages');
    }
};