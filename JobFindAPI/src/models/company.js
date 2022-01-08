'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Company extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {

        }
    };
    Company.init({
        name: DataTypes.STRING,
        thumbnail: DataTypes.STRING,
        coverimage: DataTypes.STRING,
        description: DataTypes.TEXT('long'),
        website: DataTypes.STRING,
        address: DataTypes.STRING,
        phonenumber: DataTypes.STRING,
        amountemployer: DataTypes.INTEGER,
        taxnumber: DataTypes.STRING
    }, {
        sequelize,
        modelName: 'Company',
    });
    return Company;
};