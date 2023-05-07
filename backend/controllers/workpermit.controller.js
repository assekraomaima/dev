const Workpermit = require("../models/WorkPermit");
const User = require("../models/User");
/**
 *
 * @param {*} req express request
 * @param {*} res express response
 * @param {*} next express next middleware
 */
async function createWorkpermit(req, res, next) {
     try {
      let { startTime, endDate, UserId }= req.body;

        const workpermit = await Workpermit.findOne({ where: { startTime: startTime } });
        if (workpermit) {
          return res.status(409).json({ message: "workpermit_exist" });
        }
        const user = await User.findByPk(UserId);
        let workpermitCreated = await Workpermit.create({
            startTime,
            endDate
          
        });
        await workpermitCreated.setUser(user);
        return res.status(201).json({ message: "workpermit_created" });
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
async function findAllWorkpermit(req, res, next) {
  try {
    console.log(req.workpermit);
    const workpermits = await Workpermit.findAll({
      attributes: { exclude: "startTime" },
    });
    return res.status(200).json(workpermits);
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
async function findWorkpermitById(req, res, next) {
  try {
    const id = req.params.id;
    const workpermit= await Workpermit.findByPk(id, {
      attributes: { exclude: "startTime" },
    });
    return res.status(200).json(workpermit);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "an error occurred please try later" });
  }
}

/**
 *
 * @param {*} roleId
 * @returns
 */


/**
 *
 * @param {*} req  express request
 * @param {*} res  express response
 * @param {*} next express next middleware
 */
async function editWorkpermit(req, res, next) {
  try {
      const idWorkpermit= req.params.id;
      let { startTime,endDate, UserId } = req.body;
  
      let [workpermit , userByEmail, user] = await Promise.all([
        Workpermit.findByPk(idWorkpermit),
        Workpermit.findOne({ where: { startTime: startTime } }),
        User.findByPk(UserId),
      ]);
      //  if (JSON.stringify(absance) !== JSON.stringify(userByEmail)) {
      //    return res.status(409).json({ message: "absance_exist" });
      //  }
      
      workpermit.startTime= startTime;
      workpermit.endDate= endDate;
 
      
      await Promise.all([workpermit.save(), workpermit.setUser(user)]);
      return res.status(200).json({ message: "workpermit updated successfully" });
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
async function deleteWorkpermit(req, res, next) {
  try {
      const id = req.params.id;
      let workpermitDeleted = await Workpermit.destroy({ where: { id: id } });
      if (workpermitDeleted > 0) {
        return res.status(200).json({ message: "workpermit deleted successfully" });
      } else {
        return res.status(404).json({ message: "this workpermit not found" });
      }
    } catch (error) {
      return res
        .status(500)
        .json({ message: "an error occurred please try later" });
    }}

module.exports = {
  createWorkpermit,
  findAllWorkpermit,
  findWorkpermitById,
  editWorkpermit,
  deleteWorkpermit,
}