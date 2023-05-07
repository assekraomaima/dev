const User = require("../models/User");
const ReservationCar = require("../models/ReservationCar");
const Car = require("../models/Car");

async function createReservationCar (req, res, next){
   
    try {
    let {StartDate, endDate,type,CarId} = req.body;
    let UserId = req.user.id;
   
    let {status}="ongoing";
    const user = await User.findByPk(UserId);
    const car = await Car.findByPk(CarId);

    let  ReservationCarCreated= await ReservationCar.create({
      StartDate,
      endDate,
      type,
      status
    }); 
    
    
    await ReservationCarCreated.setUser(user);
    await ReservationCarCreated.setCar(car);
    return res.status(201).json({ message: "ReservationCar_created" });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "an error occurred please try later" });
  }}

  async function accepterReservationCar (req, res, next){
      const { id } = req.params;
    
      try {
        const reservationCar = await ReservationCar.findByPk(id);
        if (!reservationCar) {
          return res.status(404).send("Demande Reservation Car acceptted successfully");
        }
        const updatedDoc = await ReservationCar.update(
          { status: "accepted" },
          { where: { id } }
        );
        res.status(200).send(updatedDoc);
      } catch (error) {
        console.error(error);
        res.status(500).send("Une erreur s'est produite lors de la mise à jour de la demande de congé");
      }
    }


 async function refuserReservationCar(req, res, next){
  const { id } = req.params;
    
  try {
    const reservationCar = await ReservationCar.findByPk(id);
    if (!reservationCar) {
      return res.status(404).send("Refused reservation car");
    }
    const updatedDoc = await ReservationCar.update(
      { status: "rejected" },
      { where: { id } }
    );
    res.status(200).send(updatedDoc);
  } catch (error) {
    console.error(error);
    res.status(500).send("an error occurred please try later");
  }
}
 

async function findMyReservationCar(req, res, next){
    try {
        let UserId = req.user.id;
        let reservationCar = await ReservationCar.findAll(
          {
            include:
              [
                { model: User, attributes: ["id", "firstName", "lastName", "email"] }],
            where: {'$User.id$': UserId} // $Users---> tableau users
          });
        return res.status(200).json(reservationCar);
      } catch (error) {
        console.log(error);
        return res.status(500).json({ message:"an error occurred please try later" });
      }
 }
 

async function findAllReservationCar(req, res, next){
   try{ 
        const reservationCar = await ReservationCar.findAll({
        
        include: [{
          model: User,
          attributes: {
            exclude: ['password']
          }
        }]

    });
    return res.status(200).json(reservationCar);

  }catch{
    return res.status(500).json({message:"an error occurred please try later"});
  }
}


async function findReservationCarById(req, res, next){
    try {
        const reservationCar= await ReservationCar.findByPk(id,{
          
          include: [{
            model: User,
            attributes: {
              exclude: ['password']
            }
          }]
        });
        return res.status(200).json(reservationCar);

    }catch{
      return res.status(500).json({message:"an error occurred please try later"});
    }
}



async function editReservationCar(req, res, next){
  try {
    const id = req.params.id;
    let {StartDate, endDate,status,type, userId,CarId}=req.body;

    let [reservationCar, car] = await Promise.all([
        ReservationCar.findByPk(id),
      User.findByPk(userId),
      Car.findByPk(CarId),

    ]);
   
    reservationCar.StartDate = StartDate;
    reservationCar.endDate = endDate;
    reservationCar.status= status;
    reservationCar.type = type;
    await Promise.all([
      reservationCar.save(),
      reservationCar.setCar(car)    ]);
    
    
    return res.status(200).json({ message: "reservation Car updated successfully" });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "an error occurred please try later" });
  }
      
    }


async function deleteReservationCar(req, res, next){
    try {
        const id = req.params.id;
        let reservationCarDeleted = await ReservationCar.destroy({ where: { id: id } });
        if (reservationCarDeleted > 0) {
          return res.status(200).json({ message: "reservation Car deleted successfully" });
        } else {
          return res.status(404).json({ message: "this reservation Car not found" });
        }
      } catch (error) {
        return res
          .status(500)
          .json({ message: "an error occurred please try later" });
      }}
      module.exports={
        createReservationCar,
        findAllReservationCar,
        findReservationCarById,
        deleteReservationCar,
        findMyReservationCar,
        editReservationCar,
        accepterReservationCar,
        refuserReservationCar
          }