const User = require("../models/User");
const Material = require("../models/Material");

async function createMaterial (req, res, next){
   
    try {
    let {name} = req.body;
    let MaterialCreated= await Material.create({
      name,
    }); 
    

    await MaterialCreated;
    return res.status(201).json({ message: "Material_created" });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "an error occurred please try later" });
  }}

  async function findAllMaterial(req, res, next){
    try{ 
         const material = await Material.findAll({
         
     });
     return res.status(200).json(material);
 
   }catch{
     return res.status(500).json({message:"an error occurred please try later"});
   }
 }
 
 

async function findMaterialById(req, res, next){
  try {
    const id = req.params.id;
    const material = await Material.findByPk(id)
    ;
    return res.status(200).json(material);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "an error occurred please try later" });
  }
}



async function editMaterial(req, res, next){
  try {
    const id = req.params.id;
    let {name}=req.body;

    let [ material] = await Promise.all([
        Material.findByPk(id)
    ]);
   
    material.name = name;
    await Promise.all([
      material.save()
    ])
    
    return res.status(200).json({ message: "Material updated successfully" });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "an error occurred please try later" });
  }
      
    }


async function deleteMaterial(req, res, next){
    try {
        const id = req.params.id;
        let MaterialDeleted = await Material.destroy({ where: { id: id } });
        if (MaterialDeleted > 0) {
          return res.status(200).json({ message: "Material deleted successfully" });
        } else {
          return res.status(404).json({ message: "this Material not found" });
        }
      } catch (error) {
        return res
          .status(500)
          .json({ message: "an error occurred please try later" });
      }}
      module.exports={
        createMaterial,
        findAllMaterial,
        findMaterialById,
        deleteMaterial,
        editMaterial,
       
          }