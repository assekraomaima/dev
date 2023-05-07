const { Model, DataTypes } = require('sequelize');
const sequelize = require('../helpers/connect-to-database').sequelize;
const User = require('./User');

class WorkType extends Model {};

WorkType.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    type: {
        type: DataTypes.ENUM,
        values: ['ongoing', 'accepted', 'rejected'],
        defaultValue:"ongoing"
    },
    Date: {
        type: DataTypes.DATE,
        allowNull: false
    },
    Raison: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    sequelize,
    tableName: 'WorkType',
    paranoid: true,
    timestamps: true,
});


WorkType.belongsToMany(User, { through: 'UserWorkType' });
User.belongsToMany(WorkType, { through: 'UserWorkType' });

module.exports = WorkType;