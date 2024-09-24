const jwt = require("jsonwebtoken")
require("dotenv").config();

exports.isAuthenticated = async(req,res,next)=>{
    try {
        const token = req.cookies.token || req.body.token || req.header("Authorization").replace("Bearer ","");
        if(!token){
            return res.status(404).json({
                success : false ,
                message : "Token not Found"
            })
        } 
        const decode = jwt.verify(token,process.env.JWT_SECRET);
        console.log(decode);
        req.userId = decode._id ;
        next();
    } catch (error) {
        console.log(error.message)
        console.log("Something Went Wrong While Authentication");
    }
}