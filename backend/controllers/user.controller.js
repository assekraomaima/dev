const User = require("../models/User");
const userData = require("../static/data/user.data.json");
const Role = require("../models/Role");
const Permission = require("../models/Permission");
const Departement = require("../models/Departement");
async function initUserFromJsonFile() {
  let users = await User.findAll({});
  if (users.length > 0) {
    console.log("another users already exist");
    return;
  }
  let user = await User.findOne({ where: { email: userData.email } });
  if (user) {
    return new Error("email already taken");
  }

  let role = await Role.findOne({ key: userData.role_key }, { raw: false });
  let userCreated = await User.create(userData);
  await userCreated.setRole(role);
}
/**
 *
 * @param {*} req express request
 * @param {*} res express response
 * @param {*} next express next middleware
 */
async function createUser(req, res, next) {
  try {
    let {
      firstName,
      lastName,
      email,
      password,
      phoneNumber,
      remoteDays,
      isEnabled,
      departementId,
      roleId,
    } = req.body;
    const user = await User.findOne({ where: { email: email } });
    if (user) {
      return res.status(409).json({ message: "user_exist" });
    }

    const role = await Role.findByPk(roleId);
    const departement = await Departement.findByPk(departementId);
    let userCreated = await User.create({
      firstName,
      lastName,
      email,
      password,
      phoneNumber,
      remoteDays,
      isEnabled,
    });
    await userCreated.setRole(role);
    await userCreated.setDepartement(departement);
    return res.status(201).json({ message: "user_created" });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "an error occurred please try later" });
  }
}

/**
 *
 * @param {*} req  express request
 * @param {*} res  express response
 * @param {*} next express next middleware
 */

async function findAllUsers(req, res, next) {
  try {
    let users = await User.findAll({
      include: [{ model: Role }, { model: Departement }],
      attributes: { exclude: ["password"] },
    });
    return res.status(200).json(users);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "an error occurred please try later" });
  }
}

/**
 *
 * @param {*} req  express request
 * @param {*} res  express response
 * @param {*} next express next middleware
 */

async function findUserById(req, res, next) {
  try {
    const userId = req.params.userId;
    const user = await User.findByPk(userId, {
      attributes: { exclude: "password" },
      include: [{ model: Role }, { model: Departement }],
    });
    return res.status(200).json(user);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "an error occurred please try later" });
  }
}

async function findUserByEmail(email) {
  return await User.findOne({
    include: [
      { model: Role, include: [{ model: Permission, attributes: ["key"] }] },
    ],
    where: { email: email },
  });
}

/**
 *
 * @param {*} roleId
 * @returns
 */
async function findOneUserByRoleId(roleId) {
  return await User.findOne({ where: { RoleId: roleId } });
}
async function findOneUserByDepartementId(departementId) {
  return await User.findOne({ where: { DepartementId: departementId } });
}

/**
 *
 * @param {*} req  express request
 * @param {*} res  express response
 * @param {*} next express next middleware
 */

async function editUser(req, res, next) {
  try {
    const userId = req.params.userId;
    let {
      firstName,
      lastName,
      email,
      remoteDays,
      phoneNumber,
      isEnabled,
      roleId,
      departementId,
    } = req.body;

    let [user, userByEmail, role, departement] = await Promise.all([
      User.findByPk(userId),
      User.findOne({ where: { email: email } }),
      Role.findByPk(roleId),
      Departement.findByPk(departementId),
    ]);
    if (JSON.stringify(user) !== JSON.stringify(userByEmail)) {
      return res.status(409).json({ message: "user_exist" });
    }

    user.firstName = firstName;
    user.lastName = lastName;
    user.email = email;
    user.remoteDays = remoteDays;
    user.phoneNumber = phoneNumber;

    user.isEnabled = isEnabled;
    await Promise.all([
      user.save(),
      user.setRole(role),
      user.setDepartement(departement),
    ]);
    return res.status(200).json({ message: "user updated successfully" });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "an error occurred please try later" });
  }
}

/**
 *
 * @param {*} req  express request
 * @param {*} res  express response
 * @param {*} next express next middleware
 */
async function deleteUser(req, res, next) {
  try {
    const userId = req.params.userId;
    let userDeleted = await User.destroy({ where: { id: userId } });
    if (userDeleted > 0) {
      return res.status(200).json({ message: "user deleted successfully" });
    } else {
      return res.status(404).json({ message: "this user not found" });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ message: "an error occurred please try later" });
  }
}

async function updatePassword(req, res, next) {
  try {
    let userId = req.user.id;
    let password = req.body.password;
    let user = await User.findByPk(userId);
    user.password = password;
    await user.save();
    return res.status(200).json({ message: "password_updated" });
  } catch (error) {
    return res.status(500).json({ message: "error_occurred" });
  }
}

module.exports = {
  createUser,
  findAllUsers,
  findUserById,
  findUserByEmail,
  findOneUserByRoleId,
  editUser,
  deleteUser,
  updatePassword,
  initUserFromJsonFile,
  findOneUserByDepartementId,
};
