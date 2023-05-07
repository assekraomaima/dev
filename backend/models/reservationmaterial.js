const { Model, DataTypes } = require('sequelize');
const sequelize = require('../helpers/connect-to-database').sequelize;
const User = require('./User');
const Material = require ('./Material');
class ReservationMaterial extends Model {};

ReservationMaterial.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    reason:{
        type:DataTypes.STRING,
        allowNull:false,
    },

    status: {
      type: DataTypes.ENUM,
      values: ["ongoing", "accepted", "rejected"],
      defaultValue: "ongoing",
    },
    startDate:{
        type:DataTypes.DATE,
        allowNull:true,
    },
    endDate:{
        type:DataTypes.DATE,
        allowNull:true,
    },
},{
    sequelize,
    tableName: 'ReservationMaterials',
    paranoid: true,
    timestamps: true,
});

Material.hasOne(ReservationMaterial);
     ReservationMaterial.belongsTo(Material);
     
  


module.exports = ReservationMaterial;