const { Model, DataTypes } = require("sequelize");
const sequelize = require("../helpers/connect-to-database").sequelize;

class Material extends Model {}

Material.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  },
  {
    sequelize,
    tableName: "materials",
    paranoid: true,
    timestamps: true,
  }
);


module.exports = Material;