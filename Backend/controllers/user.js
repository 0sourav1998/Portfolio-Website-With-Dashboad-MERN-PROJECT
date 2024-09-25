const User = require("../models/user");
const {
  uploadImageToCloudinary,
} = require("../Cloudinary/uploadImageToCloudinary");
require("dotenv").config();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

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
    if (!fullName || !password || !email || !phone || !portfolio || !aboutMe) {
      return res.status(400).json({
        success: false,
        message: "All Fields are Required",
      });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log("here4");
    const createdUser = await User.create({
      fullName,
      email,
      password: hashedPassword,
      aboutMe,
      phone,
      image: cloudinaryImageResponse.secure_url,
      resume: cloudinaryResumeResponse.secure_url.replace("pdf", "jpg"),
      portfolio,
      githubUrl: githubUrl ? githubUrl : "",
      linkedinUrl: linkedinUrl ? linkedinUrl : "",
      twitterUrl: twitterUrl ? twitterUrl : "",
      instagramUrl: instagramUrl ? instagramUrl : "",
      facebookUrl: facebookUrl ? facebookUrl : "",
    });
    return res.status(201).json({
      success: true,
      message: "User Created Successfully",
      createdUser,
    });
  } catch (error) {
    console.log(error.message);
    return res.status(400).json({
      success: false,
      message: "Something Went Wrong While Registering the User",
    });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "All Fields are Required",
      });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User Not Found with these email",
      });
    }
    const payload = {
      _id: user._id,
    };
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (isPasswordMatch) {
      const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: "1d",
      });
      return res
        .cookie("token", token, {
          maxAge: 1 * 24 * 60 * 60 * 1000,
          httpOnly: true,
        })
        .status(200)
        .json({
          success: true,
          message: "User Logged In",
        });
    } else {
      return res.status(400).json({
        success: false,
        message: "Password And Email does not match",
      });
    }
  } catch (error) {
    console.log(error.message);
    return res.status(400).json({
      success: false,
      message: "Something Went Wrong While Logging In",
    });
  }
};

exports.getProfile = async (req, res) => {
  try {
    const userId = req.userId;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User Not Found",
      });
    }
    return res.status(200).json({
      success: true,
      message: "User Fetched Successfully",
      user,
    });
  } catch (error) {
    console.log(error.message);
    return res.status(400).json({
      success: false,
      message: "Something Went Wrong while fetching Profile",
    });
  }
};

exports.editProfile = async (req, res) => {
  try {
    const userId = req.userId;
    const {
      fullName,
      email,
      aboutMe,
      portfolio,
      phone,
      githubUrl,
      twitterUrl,
      linkedinUrl,
      facebookUrl,
      instagramUrl,
    } = req.body;
    const user = await User.findById(userId);
    if (req?.files && req.files.image) {
      const { image } = req.files;
      const cloudinaryImage = await uploadImageToCloudinary(image);
      if (cloudinaryImage) {
        user.image = cloudinaryImage.secure_url;
      }
    }
    if (req?.files && req.files.resume) {
      const { resume } = req.files;
      const cloudinaryResume = await uploadImageToCloudinary(resume);
      if (cloudinaryResume) {
        user.image = cloudinaryResume.secure_url.replace("pdf", "jpg");
      }
    }
    if (fullName) {
      user.fullName = fullName;
    }
    if (email) {
      user.email = email;
    }
    if (aboutMe) {
      user.aboutMe = aboutMe;
    }
    if (portfolio) {
      user.portfolio = portfolio;
    }
    if (phone) {
      user.phone = phone;
    }
    if (githubUrl) {
      user.githubUrl = githubUrl;
    }
    if (instagramUrl) {
      user.instagramUrl = instagramUrl;
    }
    if (linkedinUrl) {
      user.linkedinUrl = linkedinUrl;
    }
    if (facebookUrl) {
      user.facebookUrl = facebookUrl;
    }
    if (twitterUrl) {
      user.twitterUrl = twitterUrl;
    }
    await user.save();
    return res.status(200).json({
      success: true,
      message: "Profile Edited",
      user,
    });
  } catch (error) {
    console.log(error.message);
    return res.status(400).json({
      success: false,
      message: "Something Went Wrong While Editing Profile",
    });
  }
};

exports.updatePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword, confirmNewPassword } = req.body;
    if (!currentPassword || !newPassword || !confirmNewPassword) {
      return res.status(400).json({
        success: false,
        message: "All fields are Required",
      });
    }
    const user = await User.findById(req.userId);
    const matchPassword = await bcrypt.compare(currentPassword, user.password);
    if (matchPassword) {
      if (newPassword !== confirmNewPassword) {
        return res.status(400).json({
          success: false,
          message: "Password and confirm Password does not Match",
        });
      }
      const hashedPassword = await bcrypt.hash(newPassword, 10);
      user.password = hashedPassword;
      await user.save();
      return res.status(200).json({
        success: true,
        message: "Password Changed Successfully",
      });
    } else {
      return res.status(400).json({
        success: false,
        message: "Password does not match",
      });
    }
  } catch (error) {
    console.log(error.message);
    return res.status(200).json({
      success: false,
      message: "Error while updating Password",
    });
  }
};

exports.getProfileForPortfolio = async(req,res)=>{
  try {
    const userId = "66f1c0669fabe5593ad03c2b";
    const user = await User.findById(userId);
    return res.status(200).json({
      success : true ,
      message : "User Fetched Successfully",
      user
    })
  } catch (error) {
    console.log(error.message);
    return res.status(200).json({
      success: false,
      message: "Error while Fetching User",
    });
  }
}
