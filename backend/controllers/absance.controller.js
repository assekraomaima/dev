const Absance = require("../models/Absance");
const User = require("../models/User");
/**
 *
 * @param {*} req express request
 * @param {*} res express response
 * @param {*} next express next middleware
 */
async function createAbsance(req, res, next) {
     try {
      let { Date , userId }= req.body;

        const absance = await Absance.findOne({ where: { Date: Date } });
        if (absance) {
          return res.status(409).json({ message: "absance_exist" });
        }
        const user = await User.findByPk(userId);
        let absanceCreated = await Absance.create({
            Date
          
        });
        await absanceCreated.setUser(user);
        return res.status(201).json({ message: "absance_created" });
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
async function findAllAbsance(req, res, next) {
  try {
    console.log(req.absance);
    const absances = await Absance.findAll({
      attributes: { exclude: "date" },
    });
    return res.status(200).json(absances);
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
async function findAbsanceById(req, res, next) {
  try {
    const id = req.params.id;
    const absance = await Absance.findByPk(id, {
      attributes: { exclude: "date" },
    });
    return res.status(200).json(absance);
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
async function  editAbsance(req, res, next) {
  try {
      const idAbsance= req.params.id;
      let { Date, userId } = req.body;
  
      let [absance,userByEmail, user] = await Promise.all([
        Absance.findByPk(idAbsance),
        Absance.findOne({ where: { Date: Date } }),
        User.findByPk(userId),
      ]);
      //  if (JSON.stringify(absance) !== JSON.stringify(userByEmail)) {
      //    return res.status(409).json({ message: "absance_exist" });
      //  }
      
      absance.Date = Date;
 
      
      await Promise.all([absance.save(), absance.setUser(user)]);
      return res.status(200).json({ message: "absance updated successfully" });
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
async function deleteAbsance(req, res, next) {
    try {
        const id = req.params.id;
        let absanceDeleted = await Absance.destroy({ where: { id: id } });
        if (absanceDeleted > 0) {
          return res.status(200).json({ message: "absance deleted successfully" });
        } else {
          return res.status(404).json({ message: "this absance not found" });
        }
      } catch (error) {
        return res
          .status(500)
          .json({ message: "an error occurred please try later" });
      }}
  


module.exports = {
  createAbsance,
  findAllAbsance,
  findAbsanceById,
  editAbsance,
  deleteAbsance,
};