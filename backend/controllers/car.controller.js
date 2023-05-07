const User = require("../models/User");
const Car = require("../models/Car");

async function createCar (req, res, next){
   
    try {
    let {marque, matricule} = req.body;
    const car = await Car.findOne({ where: { matricule: matricule } });
      if (car) {
        return res.status(409).json({ message: "Matricule_exist" });
      }
    let CarCreated= await Car.create({
      marque,
      matricule
    }); 
    

    await CarCreated;
    return res.status(201).json({ message: "Car_created" });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "an error occurred please try later" });
  }}

  async function findAllCar(req, res, next){
    try{ 
         const car = await Car.findAll({

 
     });
     return res.status(200).json(car);
 
   }catch{
     return res.status(500).json({message:"an error occurred please try later"});
   }
 }
 
 

async function findCarById(req, res, next){
    try {
      const id = req.params.id;

        const car= await Car.findByPk(id);
        return res.status(200).json(car);

    }catch{
      return res.status(500).json({message:"an error occurred please try later"});
    }
}



async function editCar(req, res, next){
  try {
    const id = req.params.id;
    let {marque,matricule}=req.body;

    let [ car] = await Promise.all([
        Car.findByPk(id)
    ]);
   
    car.marque = marque;
    car.matricule = matricule;
    await Promise.all([
      car.save()
    ])
    
    return res.status(200).json({ message: "Car updated successfully" });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "an error occurred please try later" });
  }
      
    }


async function deleteCar(req, res, next){
    try {
        const id = req.params.id;
        let CarDeleted = await Car.destroy({ where: { id: id } });
        if (CarDeleted > 0) {
          return res.status(200).json({ message: "Car deleted successfully" });
        } else {
          return res.status(404).json({ message: "this Car not found" });
        }
      } catch (error) {
        return res
          .status(500)
          .json({ message: "an error occurred please try later" });
      }}
      module.exports={
        createCar,
        findAllCar,
        findCarById,
        deleteCar,
        editCar,
       
          }