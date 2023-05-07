const User = require("../models/User");
const userController = require("../controllers/user.controller");
const Mission = require("../models/Mission");
const { Op } = require("sequelize");
async function initAdminMissionFromJsonFile() {
  try {
    let missions = await Mission.findAll({});
    if (missions.length === 0) {
      let user = await userController.findAllUsers();
      let mission = await Mission.create();
      await mission.addUser(user);
    }
  } catch (error) {
    console.error(error);
  }
}

async function createMission(req, res, next) {

  try {
    let { startDate, endDate, description, userId } = req.body;
    console.log(req.body);
    let users = await User.findAll({ where: { id: { [Op.in]: userId } } });//relation many to many 
    let mission = await Mission.create({
      startDate,
      endDate,
      description,

    });
    await mission.setUsers(users);
    return res.status(201).json({ message: "mission created successfully" });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "an error occurred please try later" });
  }
}


/**
 * get Array of roles from database
 * @param {*} req express request
 * @param {*} res express response
 * @param {*} next express next middleware
 * @returns Array of roles
 */
async function findAllMission(req, res, next) {
  try {
    let mission = await Mission.findAll(
      {
        include:
          [
            { model: User, attributes: ["id", "firstName", "lastName", "email"] }]
    });
    return res.status(200).json(mission);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "an error occurred please try later" });
  }
}

async function findMyMissions(req, res, next) {
  try {
    let UserId = req.user.id;
    let missions = await Mission.findAll(
      {
        include:
          [
            { model: User, attributes: ["id", "firstName", "lastName", "email"] }],
        where: {'$Users.id$': UserId} // $Users---> tableau users
      });
    return res.status(200).json(missions);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'an error occurred!' })
  }
}
// SELECT * FROM post WHERE authorId = 2;

/**
 * get Role by Id
 * @param {*} req express request
 * @param {*} res express response
 * @param {*} next express next middleware
 * @returns Role
 */
async function findMissionById(req, res, next) {

  try {
    const id = req.params.id;
    let mission = await Mission.findByPk(id, {
      include: [
        {
          model: User,
        },
      ],
    });
    return res.status(200).json(mission);
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
async function findOneMissionByUserId(userId) {
  return await User.findOne({ where: { UserId: userId } });
}

/**
 * edit role
 * @returns
 */
async function editMission(req, res, next) {
  
  try {
    const id = req.params.id;
    let { startDate, endDate, description } = req.body;
    let [mission] = await Promise.all([
      Mission.findByPk(id),
      Mission.findOne({ where: { id: id } }),
    ]);
    mission.startDate = startDate;
    mission.endDate = endDate;
    mission.description = description;


    await Promise.all([mission.save()]);
    return res.status(200).json({ message: "mission updated successfully" });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "an error occurred please try later" });
  }
}


async function deleteMission(req, res) {
  try {
    const id = req.params.id;
    let MissionDeleted = await Mission.destroy({ where: { id: id } });
    if (MissionDeleted > 0) {
      return res.status(200).json({ message: "Mission deleted successfully" });
    } else {
      return res.status(404).json({ message: "this Mission not found" });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ message: "an error occurred please try later" });
  }
}


module.exports = {
  initAdminMissionFromJsonFile,
  createMission,
  findAllMission,
  findMissionById,
  findOneMissionByUserId,
  editMission,
  deleteMission,
  findMyMissions
}