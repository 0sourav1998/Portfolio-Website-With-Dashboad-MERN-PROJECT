const {
  uploadImageToCloudinary,
} = require("../Cloudinary/uploadImageToCloudinary");
const Skill = require("../models/skill");
require("dotenv").config();

exports.addSkill = async (req, res) => {
  try {
    const { title, proficiency } = req.body;
    if (!title || !proficiency) {
      return res.status(400).json({
        success: false,
        message: "All Fields are Required",
      });
    }
    let cloudinarySkill;
    if (req.files) {
      const image = req.files.skillImage;
      cloudinarySkill = await uploadImageToCloudinary(
        image,
        process.env.PORTFOLIO_SKILL_FOLDER
      );
    }
    const newSkill = await Skill.create({
      title,
      proficiency,
      skillImage: cloudinarySkill.secure_url,
    });
    return res.status(201).json({
      success: true,
      message: "Skill Added",
      newSkill,
    });
  } catch (error) {
    console.log(error.message);
    return res.status(400).json({
      success: false,
      message: "Something Went Wrong While Adding Skill",
    });
  }
};

exports.deleteSkill = async (req, res) => {
  try {
    const { id } = req.body;
    if (!id) {
      return res.status(400).json({
        success: false,
        message: "This Field Required",
      });
    }
    const deletedSkill = await Skill.findByIdAndDelete(id);
    return res.status(201).json({
      success: true,
      message: "Skill Deleted",
      deletedSkill,
    });
  } catch (error) {
    console.log(error.message);
    return res.status(400).json({
      success: false,
      message: "Something Went Wrong While Deleting Skill",
    });
  }
};

exports.updateSkill = async (req, res) => {
  try {
    const { proficiency, id } = req.body;
    if (!proficiency || !id) {
      return res.status(400).json({
        success: false,
        message: "These Fields Required",
      });
    }
    const updatedSkill = await Skill.findByIdAndUpdate(
      id,
      { proficiency: proficiency },
      { new: true }
    );
    return res.status(201).json({
      success: true,
      message: "Skill Updated",
      updatedSkill,
    });
  } catch (error) {
    console.log(error.message);
    return res.status(400).json({
      success: false,
      message: "Something Went Wrong While Updating Skill",
    });
  }
};

exports.getAll = async (req, res) => {
  try {
    const getAllSkill = await Skill.find({});
    return res.status(200).json({
      success: true,
      message: "Skill Fetched Successfully",
      getAllSkill,
    });
  } catch (error) {
    console.log(error.message);
    return res.status(400).json({
      success: false,
      message: "Something Went Wrong While Fetching Skills",
    });
  }
};
