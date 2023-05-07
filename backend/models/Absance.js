const { Model, DataTypes } = require('sequelize');
const User = require('./User');
const sequelize = require('../helpers/connect-to-database').sequelize;

class Absance extends Model {};

Absance.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    Date: {
        type: DataTypes.DATE,
        allowNull: false
    }
},{
    sequelize,
    tableName: 'absances',
    paranoid: true,
    timestamps: true,
});


User.hasMany(Absance);
Absance.belongsTo(User);

module.exports = Absance;