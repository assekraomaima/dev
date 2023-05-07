const { Model, DataTypes } = require('sequelize');
const sequelize = require('../helpers/connect-to-database').sequelize;
const User = require('./User');
const Car = require ('./Car');
class ReservationCar extends Model {};

ReservationCar.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    StartDate: {
        type: DataTypes.DATE,
        allowNull: false
    },
    endDate:{
        type:DataTypes.DATE,
        allowNull:false
    },
    type:{
        type:DataTypes.STRING,
        allowNull:false
    },
    status: {
      type: DataTypes.ENUM,
      values: ["ongoing", "accepted", "rejected"],
      defaultValue: "ongoing",
    }
},{
    sequelize,
    tableName: 'ReservationCars',
    paranoid: true,
    timestamps: true,
});

Car.hasOne(ReservationCar);
ReservationCar.belongsTo(Car);
     
  


module.exports = ReservationCar;