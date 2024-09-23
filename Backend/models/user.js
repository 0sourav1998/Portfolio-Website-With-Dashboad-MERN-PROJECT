const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    fullName : {
        type : String ,
        required : [true , "Name Required"]
    },
    email : {
        type : String ,
        required : [true , "Email Required"]
    },
    phone : {
        type : String ,
        required : [true , "Phone Number Required"]
    },
    aboutMe : {
        type : String ,
        required : [true , "About Me Required"]
    },
    password : {
        type : String ,
        required : true ,
        minLength : [8 , "Min Length of Password Should be 8"]
    } ,
    image : {
        type : String ,
        required : [true , "Image is Required"]
    } ,
    resume : {
        type : String ,
        required : [true , "Resume is Required"]
    } ,
    portfolio  : {
        type : String ,
        required : [true , "Portfolio is Required"]
    } ,
    githubUrl : String ,
    twitterUrl : String ,
    linkedinUrl : String ,
    facebookUrl : String ,
    instagramUrl : String ,
    resetPasswordToken  : String ,
    resetPasswordExpire : Date
})

module.exports = mongoose.model("User",userSchema)