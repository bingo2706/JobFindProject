'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Cv extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {

        }
    };
    Cv.init({
        user_id: DataTypes.INTEGER,
        file: DataTypes.BLOB('long'),
        post_id: DataTypes.INTEGER,
        isChecked: DataTypes.INTEGER,
        description: DataTypes.STRING
    }, {
        sequelize,
        modelName: 'Cv',
    });
    return Cv;
};