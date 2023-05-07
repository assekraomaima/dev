const Departement = require("../models/Departement");
const userController = require ("../controllers/user.controller");
const User = require("../models/User");

/**
 *
 * @param {*} req express request
 * @param {*} res express response
 * @param {*} next express next middleware
 */
  async function createDepartement(req, res, next) {
    try {
      let name= req.body.name;
      const departement = await Departement.findOne({ where: { name: name } });
      if (departement) {
        return res.status(409).json({ message: "departement_exist" });
      }
      let departementCreated = await Departement.create({
        name
      });
      await departementCreated ;
      return res.status(201).json({ message: "departement_created" });
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
async function findAllDepartement(req, res, next) {
  try {
    console.log(req.departement);
    const departements = await Departement.findAll({
      attributes: { exclude: "Name" },
    });
    return res.status(200).json(departements);
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
async function findDepartementById(req, res, next) {
  
  try {
    const departementId = req.params.departementId;
    const departement = await Departement.findByPk(departementId, {
      include: [
        {
          model: User,
        },
      ],
    });
    return res.status(200).json(departement);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "an error occurred please try later" });
  }
}

async function editDepartement(req, res, next){
    try {
      const departementId = req.params.departementId;
      
      let { name} = req.body;
      
      let [departement] = await Promise.all([
       Departement.findByPk(departementId),
        Departement.findOne({ where: { name: name } }),
  
      ]);
      
     
      departement.name = name;
      await Promise.all([departement.save()]);
      return res.status(200).json({ message: "departement updated successfully" });
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
async function deleteDepartement(req, res, next) {
  try {
    const departementId = req.params.departementId;
    const isUserHasThisDepartement = await userController.findOneUserByDepartementId(departementId);
    if (isUserHasThisDepartement) {
      return res.status(400).json({ message: "user_has_this_departement" });
    }
    let departementDeleted = await Departement.destroy({ where: { id: departementId } });
    if (departementDeleted > 0) {
      return res.status(200).json({ message: "Departement deleted successfully" });
    } else {
      return res.status(404).json({ message: "this Departement not found" });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ message: "an error occurred please try later" });
  }
}

module.exports = {
  createDepartement,
  findAllDepartement,
  findDepartementById,
  editDepartement,
  deleteDepartement,
};