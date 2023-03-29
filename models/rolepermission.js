'use strict';
const {
    Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class rolepermission extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    }
    rolepermission.init({
        role_id: {
            type: DataTypes.UUID,
            allowNull: false
        },
        permission_id: {
            type: DataTypes.UUID,
            allowNull: false
        }
    }, {
        sequelize,
        modelName: 'rolepermission',
    }, );

    rolepermission.associate = function(models) {

    }

    return rolepermission;
};