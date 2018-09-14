/**
* Entidade Usuário
*/
(function(){
    "use strict";
    module.exports = function (sequelize, DataTypes) {
        var User = sequelize.define('User', {
            username: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true,
                validate: {
                    is: /^[a-z0-9\_\-]+$/i
                }
            },
            email: {
                type: DataTypes.STRING,
                validate: {
                    isEmail: true
                }
            },
            first_name: {
                type: DataTypes.STRING
            },
            last_name: {
                type: DataTypes.STRING
            },
            password: {
                type: DataTypes.STRING
            },
            salt: {
                type: DataTypes.STRING
            },
            access_level: {
                type: DataTypes.INTEGER,
                defaultValue: 1
            }
        }, {
            classMethods: {
                associate: function (models) {
                    User.hasMany(models.Todo);
                }
            }
        });
        return User;
    };

}());
