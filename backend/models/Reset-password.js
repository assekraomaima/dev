const { Model, DataTypes } = require('sequelize');
const sequelize = require('../helpers/connect-to-database').sequelize;
const User = require('./User');

class ResetPassword extends Model {};

ResetPassword.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    token: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    isExpired: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    }
}, {
    sequelize,
    tableName: 'reset_passwords',
    paranoid: true,
    timestamps: true,
});

User.hasMany(ResetPassword);
ResetPassword.belongsTo(User);

module.exports = ResetPassword;