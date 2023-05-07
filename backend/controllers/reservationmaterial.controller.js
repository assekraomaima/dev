const User = require("../models/User");
const ReservationMaterial = require("../models/reservationmaterial");
const Material = require("../models/Material");


async function createReservationMaterial (req, res, next){
   
    try {
    let {reason,MaterialId, startDate, endDate} = req.body;
    let UserId = req.user.id;
   
    let {status}="ongoing";
    const user = await User.findByPk(UserId);
    const material = await Material.findByPk(MaterialId	);

    let  ReservationMaterialCreated= await ReservationMaterial.create({
     reason,
     status, 
     startDate,
     endDate
    }); 
    
    
    await ReservationMaterialCreated.setUser(user);
    await ReservationMaterialCreated.setMaterial(material);

    return res.status(201).json({ message: "ReservationMaterial_created" });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "an error occurred please try later" });
  }}


  async function affecterMaterial (req, res, next){
   
    try {
    let { reason,startDate, endDate,UserId,MaterialId} = req.body;
    let {status}="";

    const user = await User.findByPk(UserId);
    const material = await Material.findByPk(MaterialId	);

    let  affecterMaterial= await ReservationMaterial.create({
      reason,
     startDate,
     endDate,
     status,
    }); 
    
    await affecterMaterial.setMaterial(material);
    await affecterMaterial.setUser(user)
    return res.status(201).json({ message: "affecterMaterial_created" });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "an error occurred please try later" });
  }}
  async function accepterReservationMaterial (req, res, next){
      const { id } = req.params;
    
      try {
        const reservationMaterial = await ReservationMaterial.findByPk(id);
        if (!reservationMaterial) {
          return res.status(404).send("Demande Reservation Material acceptted successfully");
        }
        const updatedDoc = await ReservationMaterial.update(
          { status: "accepted" },
          { where: { id } }
        );
        res.status(200).send(updatedDoc);
      } catch (error) {
        console.error(error);
        res.status(500).send("Une erreur s'est produite lors de la mise à jour de la demande de congé");
      }
    }


 async function refuserReservationMaterial(req, res, next){
  const { id } = req.params;
    
  try {
    const reservationMaterial = await ReservationMaterial.findByPk(id);
    if (!reservationMaterial) {
      return res.status(404).send("Refused Reservation Material");
    }
    const updatedDoc = await ReservationMaterial.update(
      { status: "rejected" },
      { where: { id } }
    );
    res.status(200).send(updatedDoc);
  } catch (error) {
    console.error(error);
    res.status(500).send("an error occurred please try later");
  }
}
 

async function findMyReservationMaterial(req, res, next){
    try {
        let UserId = req.user.id;
        let reservationMaterial = await ReservationMaterial.findAll(
          {
            include:
              [
                { model: User, attributes: ["id", "firstName", "lastName", "email"] }],
            where: {'$User.id$': UserId} // $Users---> tableau users
          });
        return res.status(200).json(reservationMaterial);
      } catch (error) {
        console.log(error);
        return res.status(500).json({ message:"an error occurred please try later" });
      }
 }
 

async function findAllReservationMaterial(req, res, next){
   try{ 
        const reservationMaterial = await ReservationMaterial.findAll({
        
        include: [{
          model: User,
          attributes: {
            exclude: ['password']
          }
        }]

    });
    return res.status(200).json(reservationMaterial);

  }catch{
    return res.status(500).json({message:"an error occurred please try later"});
  }
}


async function findReservationMaterialById(req, res, next){
    try {
        const reservationMaterial= await ReservationMaterial.findByPk(id,{
          
          include: [{
            model: User,
            attributes: {
              exclude: ['password']
            }
          }]
        });
        return res.status(200).json(reservationMaterial);

    }catch{
      return res.status(500).json({message:"an error occurred please try later"});
    }
}



async function editReservationMaterial(req, res, next){
  try {
    const id = req.params.id;
    let {reason, userId, startDate, endDate}=req.body;

    let [reservationMaterial] = await Promise.all([
        ReservationMaterial.findByPk(id),
      User.findByPk(userId),
    ]);
   
    reservationMaterial.reason = reason;
    reservationMaterial.startDate = startDate;
    reservationMaterial.endDate = endDate;
    await reservationMaterial.save();
    return res.status(200).json({ message: "Reservation Material updated successfully" });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "an error occurred please try later" });
  }
      
    }


async function deleteReservationMaterial(req, res, next){
    try {
        const id = req.params.id;
        let reservationMaterialDeleted = await ReservationMaterial.destroy({ where: { id: id } });
        if (reservationMaterialDeleted > 0) {
          return res.status(200).json({ message: "Reservation Material deleted successfully" });
        } else {
          return res.status(404).json({ message: "this reservation Car not found" });
        }
      } catch (error) {
        return res
          .status(500)
          .json({ message: "an error occurred please try later" });
      }}
      module.exports={
        createReservationMaterial,
        findAllReservationMaterial,
        findReservationMaterialById,
        deleteReservationMaterial,
        findMyReservationMaterial,
        editReservationMaterial,
        accepterReservationMaterial,
        refuserReservationMaterial,
        affecterMaterial
          }