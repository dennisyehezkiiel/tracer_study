const router = require("express").Router();
const adminRouter = require("./adminRouter");
const alumniRouter = require("./alumniRouter");

router.use("/", adminRouter);
router.use("/", alumniRouter);

module.exports = router;
