const express = require("express");
const { register, login, getProfile, editProfile, updatePassword, getProfileForPortfolio } = require("../controllers/user");
const { isAuthenticated } = require("../middlewares/isAuthenticated");
const router = express.Router();

router.post("/register",register)
router.post("/login",login)
router.get("/getProfile",isAuthenticated,getProfile)
router.get("/getProfile/portfolio",getProfileForPortfolio)
router.put("/update/me",isAuthenticated,editProfile)
router.put("/update/password",isAuthenticated,updatePassword)

module.exports = router ;