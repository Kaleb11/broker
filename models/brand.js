'use strict';
const {
    Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class brand extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    }
    brand.init({
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4
        },
        country: {
            type: DataTypes.STRING,
            allowNull: false
        },
        city: {
            type: DataTypes.STRING,
            allowNull: false
        },
        sub_city: {
            type: DataTypes.STRING
        },
        longitude: DataTypes.DOUBLE,
        latitude: DataTypes.DOUBLE
    }, {
        sequelize,
        modelName: 'brand',
    }, );

    brand.associate = function(models) {

    }

    return brand;
};