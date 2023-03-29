'use strict';
const {
    Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class notification extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    }
    notification.init({
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4
        },
        notification_text: {
            type: DataTypes.STRING,
            allowNull: false
        },
        date_sent: {
            type: DataTypes.DATE
        },
        is_read: {
            type: DataTypes.BOOLEAN
        }
    }, {
        sequelize,
        modelName: 'notification',
    }, );

    notification.associate = function(models) {

    }

    return notification;
};