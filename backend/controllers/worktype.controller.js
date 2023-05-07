const User =require("../models/User");
const userController = require("../controllers/user.controller");
const Worktype = require("../models/WorkType");
const { Op } = require("sequelize");

async function initAdminWorktypeFromJsonFile() {
  try {
    let worktypes = await Worktype.findAll({});
    if (worktypes.length === 0) {
      let user = await userController.findAllUsers();
      let worktype = await Worktype.create();
      await worktypes.addUser(user);
    }
  } catch (error) {
    console.error(error);
  }
}

async function createWorktype(req, res, next) {
  try {
    let { Date,Raison,userId } = req.body;
    let  {type}  = "remote"; 
    console.log(req.body);
    let users = await User.findAll({ where: { id: { [Op.in]: userId } } });//relation many to many 
    let worktype = await Worktype.create({
      Date,
      type,
      Raison
    });
    await worktype.setUsers(users);
    return res.status(201).json({ message: "remote created successfully" });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "an error occurred please try later" });
  }

}

async function findMyWorktypes(req, res, next) {
  try {
    let UserId = req.user.id;
    let worktypes = await Worktype.findAll(
      {
        include:
          [
            { model: User, attributes: ["id", "firstName", "lastName", "email"] }],
        where: {'$Users.id$': UserId} // $Users---> tableau users
      });
    return res.status(200).json(worktypes);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'an error occurred!' })
  }
}
/**
 * get Array of roles from database
 * @param {*} req express request
 * @param {*} res express response
 * @param {*} next express next middleware
 * @returns Array of roles
 */
async function findAllWorktype(req, res, next) {
  try {
    let worktype = await Worktype.findAll({
      include: 
      [{ model: User }]
    });
    return res.status(200).json(worktype);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "an error occurred please try later" });
  }
}

/**
 * get Role by Id
 * @param {*} req express request
 * @param {*} res express response
 * @param {*} next express next middleware
 * @returns Role
 */
async function findWorktypeById(req, res, next) {

    try {
      const id = req.params.id;
      let worktype = await Worktype.findByPk(id, {
        include: [
          {
            model: User,
          },
        ],
      });
      return res.status(200).json(worktype);
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .json({ message: "an error occurred please try later" });
    }
}

/**
 * get Role from Database by unique key
 * @param {*} key string
 * @returns Role
 */

/**
 * edit role
 * @returns
 */
async function editWorktype(req, res, next) {
  try {
    const id = req.params.id;
    let { Date,Raison} = req.body;

    let [worktype] = await Promise.all([
      Worktype.findByPk(id),
      Worktype.findOne({ where: { id: id } }),
    ]);
    worktype.Date = Date;
    worktype.Raison = Raison;

    await Promise.all([worktype.save()]);
    return res.status(200).json({ message: "Worktype updated successfully" });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "an error occurred please try later" });
  }
  }
  

  async function deleteWorktype(req, res) {
    try {
        const id = req.params.id;
        let WorktypeDeleted = await Worktype.destroy({ where: { id: id } });
        if (WorktypeDeleted > 0) {
          return res.status(200).json({ message: "Worktype deleted successfully" });
        } else {
          return res.status(404).json({ message: "this Worktype not found" });
        }
      } catch (error) {
        return res
          .status(500)
          .json({ message: "an error occurred please try later" });
      }}


  module.exports ={
    initAdminWorktypeFromJsonFile,
    createWorktype,
    findAllWorktype,
    findWorktypeById,
    editWorktype,
    deleteWorktype,
    findMyWorktypes
  }