const express = require("express");
const path = require("path");
require("dotenv").config();
const cors = require("cors");
const bodyParser = require("body-parser");
const User = require("./models/User");

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use("/images/", express.static(path.join(__dirname, "static/images")));

const {
  sequelize,
  connectToDatabase,
} = require("./helpers/connect-to-database");
connectToDatabase();

sequelize.sync({ alter: false });

const permissionGroupControllers = require("./controllers/permission-group.controller");
 const permissionControllers = require("./controllers/permission.controller");
const roleControllers = require("./controllers/role.controller");
const userController = require("./controllers/user.controller");

 permissionGroupControllers.insertPermissionGroupFromJsonFileIntoDatabase();
 permissionControllers.insertPermissionsFromJsonFileIntoDatabase();
roleControllers.initAdminRoleFromJsonFile();
userController.initUserFromJsonFile();
const carControllers= require ("./controllers/car.controller");
const permissionGroupRoutes = require("./routes/permission-group.routes");
const roleRoutes = require("./routes/role.routes");
const userRoutes = require("./routes/user.routes");
const authRoutes = require("./routes/auth.routes");
const leaverequestRoutes = require("./routes/leaverequest.routes");
const missionRoutes = require("./routes/mission.routes");
const profileRoutes = require("./routes/profile.routes");
const departementRoutes = require("./routes/departement.routes");
const worktypeRoutes = require("./routes/worktype.routes");
const absanceRoutes = require("./routes/absance.routes");
const workpermitRoutes = require("./routes/workpermit.routes");
const scoringRoutes = require("./routes/scoring.routes");
const reservationCarRoutes = require("./routes/reservationcar.routes")
const carRoutes =require("./routes/car.routes");
const materialRoutes = require("./routes/materiel.routes");
const reservationmaterial =require("./routes/reservationmaterial.routes");
app.use("/api/permissions", permissionGroupRoutes);
app.use("/api/role", roleRoutes);
app.use("/api/user", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/departement", departementRoutes);
app.use("/api/worktype", worktypeRoutes);
app.use("/api/leaverequest", leaverequestRoutes);
app.use("/api/absance", absanceRoutes);
app.use("/api/mission", missionRoutes);
app.use("/api/workpermit", workpermitRoutes);
app.use("/api/scoring", scoringRoutes);
app.use("/api/reservationcar",reservationCarRoutes);
app.use("/api/car",carRoutes);
app.use("/api/material",materialRoutes);
app.use("/api/reservationmaterial",reservationmaterial)
app.listen(process.env.PORT, () => {
  console.log(`application running on port ${process.env.PORT}`);
});
