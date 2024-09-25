const {
  uploadImageToCloudinary,
} = require("../Cloudinary/uploadImageToCloudinary");
const Project = require("../models/project");
require("dotenv").config();

exports.addProject = async (req, res) => {
  try {
    if (!req.files) {
      return res.status(400).json({
        success: false,
        message: "This Field is Required",
      });
    }
    const {
      title,
      description,
      gitRepoLink,
      deployedLink,
      deployed,
      technologies,
      stack,
    } = req.body;
    const { projectImage } = req.files;
    const cloudinaryRes = await uploadImageToCloudinary(
      projectImage,
      process.env.PORTFOLIO_PROJECT_FOLDER
    );
    const createdProject = await Project.create({
      title,
      description,
      technologies,
      stack,
      gitRepoLink: gitRepoLink ? gitRepoLink : "",
      deployedLink: deployedLink ? deployedLink : "",
      deployed: deployed ? deployed : "",
      projectImage: cloudinaryRes.secure_url,
    });
    return res.status(201).json({
      success: true,
      message: "Project Created Successfully",
      createdProject,
    });
  } catch (error) {
    console.log(error.message);
    return res.status(400).json({
      success: false,
      message: "Something Went Wrong While Adding Project",
    });
  }
};

exports.updateProject = async (req, res) => {
  try {
    const {
      title,
      description,
      gitRepoLink,
      deployedLink,
      deployed,
      technologies,
      stack,
      id,
    } = req.body;
    if (!id) {
      return res.status(404).json({
        success: false,
        message: "This Field is Required",
      });
    }
    let cloudinaryProject;
    if (req.files && req.files.projectImage) {
      const { projectImage } = req.files;
      cloudinaryProject = await uploadImageToCloudinary(projectImage);
    }
    const project = await Project.findById(id);
    if (title) {
      project.title = title;
    }
    if (description) {
      project.description = description;
    }
    if (stack) {
      project.stack = stack;
    }
    if (technologies) {
      project.technologies = technologies;
    }
    if (deployed) {
      project.deployed = deployed;
    }
    if (deployedLink) {
      project.deployedLink = deployedLink;
    }
    if (gitRepoLink) {
      project.gitRepoLink = gitRepoLink;
    }
    if (req.files.projectImage) {
      project.projectImage = cloudinaryProject.secure_url;
    }
    await project.save();
    return res.status(200).json({
      success: true,
      message: "Project Details Updated Successfully",
      project,
    });
  } catch (error) {
    console.log(error.message);
    return res.status(400).json({
      success: false,
      message: "Something Went Wrong While Updating the Project",
    });
  }
};

exports.deleteProject = async (req, res) => {
  try {
    const { id } = req.body;
    const deletedProject = await Project.findByIdAndDelete(id);
    return res.status(200).json({
      success: true,
      message: "Project Deleted",
      deletedProject,
    });
  } catch (error) {
    console.log(error.message);
    return res.status(400).json({
      success: false,
      message: "Something Went Wrong While Deleting Project",
    });
  }
};

exports.showAll = async (req, res) => {
  try {
    const allProject = await Project.find({});
    return res.status(200).json({
      success: true,
      message: "Projects Fetched Successfully",
      allProject,
    });
  } catch (error) {
    console.log(error.message);
    return res.status(400).json({
      success: false,
      message: "Error While Fetching Projects",
    });
  }
};

exports.getSpecific = async (req, res) => {
  try {
    const { id } = req.body;
    if (!id) {
      return res.status(400).json({
        success: false,
        message: "This Field is Required",
      });
    }
    const project = await Project.findById(id);
    return res.status(200).json({
      success: true,
      message: "Project Fetched Successfully",
      project,
    });
  } catch (error) {
    console.log(error.message);
    return res.status(400).json({
      success: false,
      message: "Error While Fetching the Project",
    });
  }
};
