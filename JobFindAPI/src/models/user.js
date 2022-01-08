'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class User extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            User.belongsTo(models.Allcode, { foreignKey: 'genderId', targetKey: 'code', as: 'genderData' })
            User.belongsTo(models.Allcode, { foreignKey: 'roleId', targetKey: 'code', as: 'roleData' })
        }
    };
    User.init({
        phonenumber: DataTypes.STRING,
        password: DataTypes.STRING,
        firstName: DataTypes.STRING,
        lastName: DataTypes.STRING,
        address: DataTypes.STRING,
        genderId: DataTypes.STRING,
        image: DataTypes.STRING,
        dob: DataTypes.STRING,
        roleId: DataTypes.STRING,
        statusId: DataTypes.STRING,
        company_id: DataTypes.INTEGER
    }, {
        sequelize,
        modelName: 'User',
    });
    return User;
};