const express = require("express");
const { isAuthenticated } = require("../middlewares/isAuthenticated");
const { addSkill, deleteSkill, updateSkill, getAll, getSpecific } = require("../controllers/skill");
const router = express.Router();

router.post("/add",isAuthenticated,addSkill);
router.delete("/delete/:id",isAuthenticated,deleteSkill);
router.put("/update/skill",isAuthenticated,updateSkill)
router.get("/getAll",getAll)
router.get("/get/:id",isAuthenticated,getSpecific)

module.exports = router ;