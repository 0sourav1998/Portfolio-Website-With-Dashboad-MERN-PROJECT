const express = require("express");
const { sendMessage, getAllMessages, deleteMessage } = require("../controllers/message");
const { isAuthenticated } = require("../middlewares/isAuthenticated");
const router = express.Router();

router.post("/send",sendMessage)
router.get("/getAll",getAllMessages)
router.delete("/delete/:id",isAuthenticated,deleteMessage)

module.exports = router ;