'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Notification extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {

        }
    };
    Notification.init({
        user_id: DataTypes.INTEGER,
        info: DataTypes.STRING,
        isChecked: DataTypes.BOOLEAN
    }, {
        sequelize,
        modelName: 'Notification',
    });
    return Notification;
};