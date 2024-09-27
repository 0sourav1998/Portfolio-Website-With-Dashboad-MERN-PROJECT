const User = require("../models/user")
const crypto = require("crypto");
const { sendMail } = require("../utils/sendMail");
const bcrypt = require("bcryptjs")

exports.generatePasswordToken = async(req,res)=>{
    try {
        console.log("here")
        const {email} = req.body;
        const user = await User.findOne({email});
        if(!user){
            return res.status(404).json({
                success : false ,
                message : "User Not Found"
            })
        }
        console.log("Outside")
        const resetToken = crypto.randomUUID().toString();
        console.log("Inside")
        await User.findByIdAndUpdate(user._id , {
            resetPasswordToken : resetToken ,
            resetPasswordExpires : Date.now() + 5*60*1000
        } , {new : true});
        console.log("outside")
        const url = `http://localhost:5173/update-password/${resetToken}`
        console.log("URL",url)
        await sendMail(
            email ,
            "Reset Password",
            `Your Link for email verification is \n \n ${url}. \n \n Please click this url to reset your password.`
        )
        return res.status(200).json({
            success: true ,
            message : "Email Sent Successfully",
            resetToken
        })
    } catch (error) {
        console.log(error.message)
        return res.status(401).json({
            success : false ,
            message : "Error while creating password token"
        }) ;
    }
}

exports.resetPassword = async(req,res)=>{
    try {
        const {token,password,confirmPassword} = req.body;
        console.log(token,password,confirmPassword)
        if(!token || !password || !confirmPassword){
            return res.status(400).json({
                success : false ,
                message : "All Fields are Required"
            })
        }
        const user = await User.findOne({
            resetPasswordToken : token 
        })
        if(!user){
            return res.status(400).json({
                success : false ,
                message : "Token is Invalid"
            })
        }
        if(password !== confirmPassword){
            return res.status(400).json({
                success : false ,
                message : "Password and Confirm Password should match properly"
            })
        }

        if(!user.resetPasswordExpires > Date.now()){
            return res.status(400).json({
                success : false ,
                message : "Token Expired , Please Regenerate Token"
            })
        }
        const hashedPassword = await bcrypt.hash(password,10);
        user.password = hashedPassword ;
        await user.save();
        return res.status(200).json({
            success : true ,
            message : "Password Updated"
        })
    } catch (error) {
        console.log(error.message)
        return res.status(400).json({
            success : false ,
            message : "Error while reseting Password"
        })
    }
}