const { Model, DataTypes } = require("sequelize");
const sequelize = require("../helpers/connect-to-database").sequelize;
const User = require("./User");
class LeaveRequest extends Model {}

LeaveRequest.init(
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
    status: {
      type: DataTypes.ENUM,
      values: ["ongoing", "accepted", "rejected"],
      defaultValue: "ongoing",
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    certificat: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    sequelize,
    tableName: "leaverequest",
    paranoid: true,
    timestamps: true,
  }
);
User.hasMany(LeaveRequest, {
  onUpdate: "CASCADE",
  onDelete: "RESTRICT",
});

LeaveRequest.belongsTo(User);

module.exports = LeaveRequest;
