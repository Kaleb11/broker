'use strict';
const {
    Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class plan extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    }
    plan.init({
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4
        },
        user_id: {
            type: DataTypes.UUID,
            allowNull: false
        },
        start_date: {
            type: DataTypes.DATE
        },
        expiration_date: {
            type: DataTypes.DATE
        },
        price: {
            type: DataTypes.INTEGER
        },
        total_duration_day: {
            type: DataTypes.INTEGER
        },
        left_day: {
            type: DataTypes.INTEGER
        },
        status: {
            type: DataTypes.STRING
        },
        is_read: {
            type: DataTypes.BOOLEAN
        }
    }, {
        sequelize,
        modelName: 'plan',
    }, );

    plan.associate = function(models) {

    }

    return plan;
};