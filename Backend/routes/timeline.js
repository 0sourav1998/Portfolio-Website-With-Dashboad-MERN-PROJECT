const express = require("express");
const { isAuthenticated } = require("../middlewares/isAuthenticated");
const { addTimeline, deleteTimeline, getAllTimelines } = require("../controllers/timeline");
const router = express.Router();

router.post("/add",isAuthenticated,addTimeline);
router.delete("/delete/:id",isAuthenticated,deleteTimeline);
router.get("/getAll",getAllTimelines)

module.exports = router ;