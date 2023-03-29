'use strict';
const {
    Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class message extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    }
    message.init({
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4
        },
        message_text: {
            type: DataTypes.STRING,
            allowNull: false
        },
        sender_id: {
            type: DataTypes.UUID
        },
        recipent_id: {
            type: DataTypes.UUID
        },
        date_sent: {
            type: DataTypes.DATE
        },
        is_read: {
            type: DataTypes.BOOLEAN
        }
    }, {
        sequelize,
        modelName: 'message',
    }, );

    message.associate = function(models) {

    }

    return message;
};