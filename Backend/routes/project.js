const express = require("express");
const { isAuthenticated } = require("../middlewares/isAuthenticated");
const { addProject, deleteProject, showAll, getSpecific, updateProject } = require("../controllers/project");
const router = express.Router();

router.post("/add",isAuthenticated,addProject);
router.delete("/delete/:id",isAuthenticated,deleteProject);
router.put("/update/project",isAuthenticated,updateProject)
router.get("/getAll",showAll)
router.post("/getSpecific",isAuthenticated,getSpecific)

module.exports = router ;