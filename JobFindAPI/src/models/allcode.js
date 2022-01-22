'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Allcode extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            Allcode.hasMany(models.User, { foreignKey: 'genderId', as: 'genderData' })
            Allcode.hasMany(models.User, { foreignKey: 'roleId', as: 'roleData' })
            Allcode.hasMany(models.User, { foreignKey: 'statusId', as: 'statusData' })
            Allcode.hasMany(models.Post, { foreignKey: 'category_job_id', as: 'jobTypeData' })
            Allcode.hasMany(models.Post, { foreignKey: 'category_worktype_id', as: 'workTypeData' })
            Allcode.hasMany(models.Post, { foreignKey: 'salary_job_id', as: 'salaryTypeData' })
            Allcode.hasMany(models.Post, { foreignKey: 'category_joblevel_id', as: 'jobLevelData' })
            Allcode.hasMany(models.Post, { foreignKey: 'experience_job_id', as: 'expTypeData' })
            Allcode.hasMany(models.Post, { foreignKey: 'genderPostCode', as: 'genderPostData' })
        }
    };
    Allcode.init({
        type: DataTypes.STRING,
        value: DataTypes.STRING,
        code: DataTypes.STRING,
        image: DataTypes.STRING
    }, {
        sequelize,
        modelName: 'Allcode',
    });
    return Allcode;
};