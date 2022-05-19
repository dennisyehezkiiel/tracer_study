const adminRouter = require("express").Router();
const adminController = require('../controller/adminController')

adminRouter.get("/year", adminController.getYear);
adminRouter.post("/year", adminController.postYear);
adminRouter.get("/major", adminController.getMajor);
adminRouter.post("/major", adminController.postMajor);
adminRouter.get("/role", adminController.getRole);
adminRouter.post("/role", adminController.postRole);
adminRouter.get("/admin", adminController.getAdmin);
adminRouter.post("/adminRegister", adminController.adminRegister);
adminRouter.post("/adminLogin", adminController.adminLogin);
adminRouter.get("/alumni", adminController.getAlumni);

module.exports = adminRouter;