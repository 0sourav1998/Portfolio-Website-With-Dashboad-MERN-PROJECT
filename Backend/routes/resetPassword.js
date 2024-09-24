const express = require("express");
const { generatePasswordToken, resetPassword } = require("../controllers/resetPassword");
const router = express.Router();

router.post("/reset-password-token", generatePasswordToken)
router.put("/reset-password", resetPassword)


module.exports = router ;