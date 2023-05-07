const { Model, DataTypes } = require('sequelize');
const sequelize = require('../helpers/connect-to-database').sequelize;
const User = require ('./User');
class Scoring extends Model {};

Scoring.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    startTime: {
        type: DataTypes.DATE,
        allowNull: false
    },
    endTime:{
        type: DataTypes.DATE,
        allowNull: false 
    }

},{
    sequelize,
    tableName: 'Scoring',
    paranoid: true,
    timestamps: true,
});

User.hasMany(Scoring);
Scoring.belongsTo(User);

module.exports = Scoring;