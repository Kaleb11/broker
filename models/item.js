'use strict';
const {
    Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class item extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    }
    item.init({
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        description: {
            type: DataTypes.STRING
        },
        category_id: {
            type: DataTypes.UUID
        },
        brand_id: {
            type: DataTypes.UUID
        },
        user_id: {
            type: DataTypes.UUID
        },
        price: DataTypes.INTEGER
    }, {
        sequelize,
        modelName: 'item',
    }, );

    item.associate = function(models) {

    }

    return item;
};