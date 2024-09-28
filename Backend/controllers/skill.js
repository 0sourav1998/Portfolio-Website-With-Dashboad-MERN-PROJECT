const {
  uploadImageToCloudinary,
} = require("../Cloudinary/uploadImageToCloudinary");
const Skill = require("../models/skill");
require("dotenv").config();

exports.addSkill = async (req, res) => {
  try {
    const { title, proficiency } = req.body;
    console.log(title, proficiency)
    if (!title || !proficiency) {
      return res.status(400).json({
        success: false,
        message: "All Fields are Required",
      });
    }
    let cloudinarySkill;
    console.log(res.files)
    if (req.files) {
      const image = req.files.skillImage;
      console.log(image)
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
    const { id } = req.params;
    console.log(id)
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
    const { title , proficiency, id } = req.body;
    // console.log(title,skillImage , proficiency, id)
    const skill = await Skill.findById(id);
    if(!skill){
      return res.status(404).json({
        success : false ,
        message : "Skill not Found"
      })
    }
    if(title){
      skill.title = title
    }
    if(proficiency){
      skill.proficiency = proficiency
    }

    if(req?.files){
      const {skillImage} = req?.files
      let Response = await uploadImageToCloudinary(skillImage,process.env.PORTFOLIO_SKILL_FOLDER);
      skill.skillImage = Response.secure_url;
      console.log(skill?.skillImage)
    }
    await skill.save();
    return res.status(201).json({
      success: true,
      message: "Skill Updated",
      skill,
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


exports.getSpecific = async (req, res) => {
  try {
    const {id} = req.params ;
    console.log(id)
    const getSkill = await Skill.findById(id);
    return res.status(200).json({
      success: true,
      message: "Skill Fetched Successfully",
      getSkill,
    });
  } catch (error) {
    console.log(error.message);
    return res.status(400).json({
      success: false,
      message: "Something Went Wrong While Fetching Skills",
    });
  }
};
