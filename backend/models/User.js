const { Model, DataTypes } = require("sequelize");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const salt = bcrypt.genSaltSync(saltRounds);
const sequelize = require("../helpers/connect-to-database").sequelize;
const Role = require("./Role");
const Departement = require("./Departement");
const  ReservationCar = require("./ReservationCar");
const ReservationMaterial = require("./reservationmaterial");
class User extends Model {}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phoneNumber: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    remoteDays: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    isEnabled: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    imageUrl: {
      type: DataTypes.STRING,
    },
  },
  {
    sequelize,
    tableName: "users",
    paranoid: true,
    timestamps: true,
  }
);

User.addHook("beforeSave", async (user, options) => {
  user.password = bcrypt.hashSync(user.password, salt);
});

User.prototype.checkPassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};

Role.hasMany(User, {
  onUpdate: "CASCADE",
  onDelete: "RESTRICT",
});
User.belongsTo(Role);

Departement.hasMany(User, {
  onUpdate: "CASCADE",
  onDelete: "RESTRICT",
});
User.belongsTo(Departement);

User.hasOne(ReservationCar);
ReservationCar.belongsTo(User);

User.hasOne(ReservationMaterial);
ReservationMaterial.belongsTo(User);

module.exports = User;
