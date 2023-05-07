const { Model, DataTypes } = require('sequelize');
const sequelize = require('../helpers/connect-to-database').sequelize;

class Departement extends Model {};

Departement.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique:true
    }
},{
    sequelize,
    tableName: 'departements',
    paranoid: true,
    timestamps: true,
});



module.exports = Departement;
