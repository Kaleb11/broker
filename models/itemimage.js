'use strict';
const {
    Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class itemimage extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    }
    itemimage.init({
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4
        },
        url: {
            type: DataTypes.STRING,
            allowNull: false
        },
        item_id: {
            type: DataTypes.UUID
        },
        is_primary: {
            type: DataTypes.BOOLEAN
        }
    }, {
        sequelize,
        modelName: 'itemimage',
    }, );

    itemimage.associate = function(models) {

    }

    return itemimage;
};