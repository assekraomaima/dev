const Scoring = require("../models/Scoring");
const User = require("../models/User");
/**
 *
 * @param {*} req express request
 * @param {*} res express response
 * @param {*} next express next middleware
 */
async function createScoring(req, res, next) {
     try {
      let { startTime, endTime, UserId }= req.body;

        const scoring = await Scoring.findOne({ where: { startTime: startTime } });
        if (scoring) {
          return res.status(409).json({ message: "scoring_exist" });
        }
        const user = await User.findByPk(UserId);
        let scoringCreated = await Scoring.create({
            startTime,
            endTime
          
        });
        await scoringCreated.setUser(user);
        return res.status(201).json({ message: "scoring_created" });
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
async function findAllScoring(req, res, next) {
  try {
    console.log(req.scoring);
    const scorings = await Scoring.findAll({
      attributes: { exclude: "startTime" },
    });
    return res.status(200).json(scorings);
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
async function findScoringById(req, res, next) {
  try {
    const id = req.params.id;
    const scoring = await Scoring.findByPk(id, {
      attributes: { exclude: "startTime" },
    });
    return res.status(200).json(scoring);
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
async function  editScoring(req, res, next) {
  try {
      const idScoring= req.params.id;
      let { startTime,endTime, userId } = req.body;
  
      let [scoring , userByEmail, user] = await Promise.all([
        Scoring.findByPk(idScoring),
        Scoring.findOne({ where: { startTime: startTime } }),
        User.findByPk(userId),
      ]);
      //  if (JSON.stringify(absance) !== JSON.stringify(userByEmail)) {
      //    return res.status(409).json({ message: "absance_exist" });
      //  }
      
      scoring.startTime= startTime;
      scoring.endTime= endTime;
 
      
      await Promise.all([scoring.save(), scoring.setUser(user)]);
      return res.status(200).json({ message: "scoring updated successfully" });
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
async function deleteScoring(req, res, next) {
  try {
      const id = req.params.id;
      let scoringDeleted = await Scoring.destroy({ where: { id: id } });
      if (scoringDeleted > 0) {
        return res.status(200).json({ message: "scoring deleted successfully" });
      } else {
        return res.status(404).json({ message: "this scoring not found" });
      }
    } catch (error) {
      return res
        .status(500)
        .json({ message: "an error occurred please try later" });
    }}

module.exports = {
  createScoring,
  findAllScoring,
  findScoringById,
  editScoring,
  deleteScoring,
};