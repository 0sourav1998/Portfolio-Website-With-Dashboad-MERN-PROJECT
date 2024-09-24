const express = require("express");
const { isAuthenticated } = require("../middlewares/isAuthenticated");
const { addTool , deleteTool, showAllTools } = require("../controllers/tools");

const router = express.Router();

router.post("/add",isAuthenticated,addTool);
router.delete("/delete",isAuthenticated,deleteTool);
router.get("/getAll",showAllTools)

module.exports = router ;