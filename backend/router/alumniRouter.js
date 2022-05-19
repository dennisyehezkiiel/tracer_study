const alumniRouter = require("express").Router();
const alumniController = require('../controller/alumniController')

alumniRouter.post("/alumniRegister", alumniController.alumniRegister)
alumniRouter.post("/alumniLogin", alumniController.alumniLogin)

module.exports = alumniRouter;
