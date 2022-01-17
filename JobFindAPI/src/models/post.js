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
        category_job_code: DataTypes.STRING,
        address: DataTypes.STRING,
        salary: DataTypes.STRING,
        amount: DataTypes.INTEGER,
        time_end: DataTypes.STRING,
        category_joblevel_code: DataTypes.STRING,
        category_worktype_id: DataTypes.STRING,
        experience: DataTypes.STRING,
        genderPostCode: DataTypes.STRING,
        userId: DataTypes.INTEGER
    }, {
        sequelize,
        modelName: 'Post',
    });
    return Post;
};