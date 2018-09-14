'use strict';
module.exports = {
    up: function (queryInterface, Sequelize) {
        return queryInterface.createTable('Users', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            username: {
                type: Sequelize.STRING,
                allowNull: false,
                unique: true,
                validate: {
                    is: /^[a-z0-9\_\-]+$/i
                }
            },
            email: {
                type: Sequelize.STRING
            },
            first_name: {
                type: Sequelize.STRING
            },
            last_name: {
                type: Sequelize.STRING
            },
            password: {
                type: Sequelize.STRING
            },
            salt: {
                type: Sequelize.STRING
            },
            access_level: {
                type: Sequelize.INTEGER,
                defaultValue: 1
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE,
                defaultValue: new Date()
            },
            updatedAt: {
                allowNull: true,
                type: Sequelize.DATE
            }
        }).then(function(){
            queryInterface.sequelize.query("insert into \"public\".\"Users\"(username, email, first_name, salt, password, access_level) values('admin','nogsantos@gmail.com','Administrador','$2a$10$b1Sq3iSJKv8obbVoIzBDw.','$2a$10$b1Sq3iSJKv8obbVoIzBDw.clWPRb1GJquImyTJ/cerxmsex0uJdOq', 10);");
        });
    },
    down: function (queryInterface, Sequelize) {
        return queryInterface.dropTable('Users');
    }
};