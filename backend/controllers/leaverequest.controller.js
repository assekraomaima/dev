const User = require("../models/User");
const LeaveRequest = require("../models/LeaveRequest");
const multer = require("multer");


async function createLeaveRequest (req, res, next){
    try {
    let {startDate, endDate,type, certificat, userId}=req.body;
   
    let {status}="ongoing";
    const user = await User.findByPk(userId);
    let leaverequestCreated = await LeaveRequest.create({
      startDate,
      endDate,
      type,
      certificat,
      status,
      
    }); 
    
    await leaverequestCreated.setUser(user);
    return res.status(201).json({ message: "leaverequest_created" });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "an error occurred please try later" });
  }}

 

async function findMyLeaveRequest(req, res, next){
    try {
        let UserId = req.user.id;
        let leaverequest = await LeaveRequest.findAll(
          {
            
            include:
              [
                { model: User, attributes: ["id", "firstName", "lastName", "email"] }],
                attributes: {exclude: ["password"]  },

            where: {'$Users.id$': UserId} // $Users---> tableau users
          });
        return res.status(200).json(leaverequest);
      } catch (error) {
        console.log(error);
        return res.status(500).json({ message:"an error occurred please try later" });
      }
 }
 


async function findAllLeaveRequest(req, res, next){
   try{ 
        const leaverequest = await LeaveRequest.findAll({
        
        include: [{
          model: User,
          attributes: {
            exclude: ['password']
          }
        }]

    });
    return res.status(200).json(leaverequest);

  }catch{
    return res.status(500).json({message:"an error occurred please try later"});
  }
}


async function findLeaveRequestById(req, res, next){
    try {
        const leaverequest= await LeaveRequest.findByPk(id,{
          
          include: [{
            model: User,
            attributes: {
              exclude: ['password']
            }
          }]
        });
        return res.status(200).json(leaverequest);

    }catch{
      return res.status(500).json({message:"an error occurred please try later"});
    }
}



async function editLeaveRequest(req, res, next){
  try {
    const id = req.params.id;
    let {startDate, endDate,status, certificat, userId}=req.body;

    let [leaverequest] = await Promise.all([
      LeaveRequest.findByPk(id),
      User.findByPk(userId),
    ]);
   
     leaverequest.startDate = startDate;
     leaverequest.endDate = endDate;
     leaverequest.status= status;
     leaverequest.certificat = certificat;
    await leaverequest.save();
    return res.status(200).json({ message: "leaverequest updated successfully" });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "an error occurred please try later" });
  }
      
    }

async function deleteLeaveRequest(req, res, next){
    try {
        const id = req.params.id;
        let leaverequestDeleted = await LeaveRequest.destroy({ where: { id: id } });
        if (leaverequestDeleted > 0) {
          return res.status(200).json({ message: "Leave Request deleted successfully" });
        } else {
          return res.status(404).json({ message: "this Leave Request not found" });
        }
      } catch (error) {
        return res
          .status(500)
          .json({ message: "an error occurred please try later" });
      }}
      module.exports={
        createLeaveRequest,
        findAllLeaveRequest,
        findLeaveRequestById,
        deleteLeaveRequest,
        findMyLeaveRequest,
        editLeaveRequest,
      }