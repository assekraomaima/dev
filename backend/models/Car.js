const { Model, DataTypes } = require("sequelize");
const sequelize = require("../helpers/connect-to-database").sequelize;

class Car extends Model {}

Car.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    matricule: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    marque: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  },
  {
    sequelize,
    tableName: "cars",
    paranoid: true,
    timestamps: true,
  }
);


module.exports = Car;