const User = require("../models/user");
const {
  uploadImageToCloudinary,
} = require("../Cloudinary/uploadImageToCloudinary");
require("dotenv").config();
const bcrypt = require("bcryptjs")

exports.register = async (req, res) => {
  try {
    let cloudinaryImageResponse;
    let cloudinaryResumeResponse;
    if (req?.files) {
      const { image } = req.files;
      const { resume } = req.files;
      if (!image || !resume) {
        return res.status(400).json({
          success: false,
          message: "Both Fields are required",
        });
      }
      cloudinaryImageResponse = await uploadImageToCloudinary(
        image,
        process.env.PORTFOLIO_IMAGE_FOLDER
      );
      cloudinaryResumeResponse = await uploadImageToCloudinary(
        resume,
        process.env.PORTFOLIO_IMAGE_RESUME
      );
    }
    const {
      fullName,
      email,
      aboutMe,
      password,
      phone,
      portfolio,
      githubUrl,
      twitterUrl,
      linkedinUrl,
      facebookUrl,
      instagramUrl,
    } = req.body;
    if(!fullName || !password || !email || !phone || !portfolio || !aboutMe){
        return res.status(400).json({
            success : false ,
            message : "All Fields are Required"
        })
    }
    const hashedPassword = await bcrypt.hash(password,10);
    console.log("here4")
    const createdUser = await User.create({
        fullName,
        email ,
        password : hashedPassword ,
        aboutMe ,
        phone ,
        image : cloudinaryImageResponse.secure_url,
        resume : cloudinaryResumeResponse.secure_url.replace("pdf","jpg") ,
        portfolio ,
        githubUrl : githubUrl ? githubUrl : "",
        linkedinUrl : linkedinUrl ? linkedinUrl : "",
        twitterUrl : twitterUrl ? twitterUrl : "" ,
        instagramUrl : instagramUrl ? instagramUrl : "" ,
        facebookUrl : facebookUrl ? facebookUrl : ""
    });
    return res.status(201).json({
        success : true ,
        message : "User Created Successfully" ,
        createdUser
    })
  } catch (error) {
    console.log(error.message)
    return res.status(400).json({
      success: false,
      message: "Something Went Wrong While Registering the User",
    });
  }
};
