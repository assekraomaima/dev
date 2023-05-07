const { Model, DataTypes } = require('sequelize');
const User = require('./User');
const sequelize = require('../helpers/connect-to-database').sequelize;

class WorkPermit extends Model {};

WorkPermit.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    startTime: {
        type: DataTypes.DATE,
        allowNull: false
    },
    endDate: {
        type: DataTypes.DATE,
        allowNull: false
    }
},{
    sequelize,
    tableName: 'workPermits',
    paranoid: true,
    timestamps: true,
});


User.hasMany(WorkPermit);
WorkPermit.belongsTo(User);

module.exports = WorkPermit;