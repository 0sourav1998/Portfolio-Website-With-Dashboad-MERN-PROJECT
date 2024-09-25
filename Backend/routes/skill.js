const express = require("express");
const { isAuthenticated } = require("../middlewares/isAuthenticated");
const { addSkill, deleteSkill, updateSkill, getAll } = require("../controllers/skill");
const router = express.Router();

router.post("/add",isAuthenticated,addSkill);
router.delete("/delete",isAuthenticated,deleteSkill);
router.put("/update/skill",isAuthenticated,updateSkill)
router.get("/getAll",getAll)

module.exports = router ;