const multer = require("multer");
const User = require("../models/User");

async function getProfile(req, res) {
  try {
    const user = await User.findOne({
      where: { id: req.user.id },
      attributes: ["firstName", "lastName", "imageUrl"],
    });
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: "an error occurred!" });
  }
}

async function updateProfile(req, res) {
  try {
    const userId = req.user.id;
    let userObject = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
    };
    if (req.file) {
      console.log("controller: ", req.file);
      const url = req.protocol + "://" + req.get("host");
      userObject["imageUrl"] = url + "/images/" + req.file.filename;
    }
    await User.update(userObject, { where: { id: userId } });
    res.status(200).json({ message: "profile updated" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "an error occurred!" });
  }
}

module.exports = { getProfile, updateProfile };
