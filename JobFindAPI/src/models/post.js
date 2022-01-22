'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Post extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {

        }
    };
    Post.init({
        name: DataTypes.STRING,
        descriptionHTML: DataTypes.TEXT('long'),
        descriptionMarkdown: DataTypes.TEXT('long'),
        statusId: DataTypes.STRING,
        category_job_id: DataTypes.STRING,
        address: DataTypes.STRING,
        salary_job_id: DataTypes.STRING,
        amount: DataTypes.INTEGER,
        time_end: DataTypes.STRING,
        category_joblevel_id: DataTypes.STRING,
        category_worktype_id: DataTypes.STRING,
        experience_job_id: DataTypes.STRING,
        genderPostCode: DataTypes.STRING,
        company_id: DataTypes.INTEGER
    }, {
        sequelize,
        modelName: 'Post',
    });
    return Post;
};