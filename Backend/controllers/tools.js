const cloudinary = require("cloudinary").v2
const {uploadImageToCloudinary} = require("../Cloudinary/uploadImageToCloudinary")
const Tool = require("../models/tools")
require("dotenv").config()

exports.addTool = async(req,res)=>{
    try {
        const {toolImage,name}= req.body ;
        let cloudinaryResponse ;
        if(req.files){
            const {toolImage} = req.files;
            cloudinaryResponse = await uploadImageToCloudinary(toolImage,process.env.PORTFOLIO_TOOL_FOLDER)
        }
        const createdTool = await Tool.create({
            name ,
            toolImage : cloudinaryResponse.secure_url
        })
        return res.status(201).json({
            success : true ,
            message : "Tool Added" ,
            createdTool
        })
    } catch (error) {
        console.log(error.message);
        return res.status(400).json({
            success : false ,
            message : "Something Went Wrong While Adding Tool"
        })
    }
}

exports.deleteTool = async(req,res)=>{
    try {
        const {id} = req.params ;
        console.log(id)
        const deletedTool = await Tool.findByIdAndDelete(id);
        return res.status(200).json({
            success : true ,
            message : "Tool Deleted Successfully",
            deletedTool
        })
    } catch (error) {
        console.log(error.message);
        return res.status(400).json({
            success : false ,
            message : "Something Went Wrong While Deleting Tool"
        })
    }
}

exports.showAllTools = async(req,res)=>{
    try {
        const allTools = await Tool.find({});
        return res.status(200).json({
            success : true ,
            message : "Tools Fetched Successfully",
            allTools
        })
    } catch (error) {
        console.log(error.message);
        return res.status(400).json({
            success : false ,
            message : "Something Went Wrong While Fetching Tools"
        })
    }
}