const express = require("express");
const { sendMessage, getAllMessages, deleteMessage } = require("../controllers/message");
const router = express.Router();

router.post("/send",sendMessage)
router.get("/getAll",getAllMessages)
router.delete("/delete",deleteMessage)

module.exports = router ;