const { Model, DataTypes } = require("sequelize");
const sequelize = require("../helpers/connect-to-database").sequelize;
const User = require("./User");

class Mission extends Model {}

Mission.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    startDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    endDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    
  },
  {
    sequelize,
    tableName: "Missions",
    paranoid: true,
    timestamps: true,
  }
);

Mission.belongsToMany(User, { through: 'UserMission' });
User.belongsToMany(Mission, { through: 'UserMission' });

module.exports = Mission;

