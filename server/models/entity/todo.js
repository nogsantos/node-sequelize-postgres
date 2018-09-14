/**
 * Entidade Todo
 */
(function(){
    "use strict";
    module.exports = function (sequelize, DataTypes) {
        var Todo = sequelize.define('Todo', {
            title: {
                type: DataTypes.STRING,
                allowNull: false,
                msg: "Não pode ser vazio"
            },
            complete: {
                type: DataTypes.BOOLEAN,
                defaultValue: false
            },
            user_id:{
                type: DataTypes.INTEGER
            }
        }, {
            classMethods: {
                associate: function (models) {
                    Todo.belongsTo(models.User,{
                        foreignKey: 'user_id',
                        targetKey: 'id'
                    });
                }
            }
        });
        return Todo;
    };
    
}());
