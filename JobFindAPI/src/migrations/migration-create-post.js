'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('Posts', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            name: {
                type: Sequelize.STRING
            },
            descriptionHTML: {
                type: Sequelize.TEXT('long')
            },
            descriptionMarkdown: {
                type: Sequelize.TEXT('long')
            },
            statusId: {
                type: Sequelize.STRING
            },
            category_job_code: {
                type: Sequelize.STRING
            },
            address: {
                type: Sequelize.STRING
            },

            salary: {
                type: Sequelize.STRING
            },
            amount: {
                type: Sequelize.INTEGER
            },
            time_end: {
                type: Sequelize.STRING
            },
            category_joblevel_code: {
                type: Sequelize.STRING
            },
            category_worktype_id: {
                type: Sequelize.STRING
            },
            experience: {
                type: Sequelize.STRING
            },
            genderPostCode: {
                type: Sequelize.STRING
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE
            }
        });
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('Posts');
    }
};