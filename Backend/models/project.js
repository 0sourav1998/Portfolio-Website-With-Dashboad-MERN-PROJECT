const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema({
    title : {
        type : String ,
        required : true 
    },
    description : {
        type : String ,
        required : true 
    },
    projectImage : {
        type : String ,
        required : true 
    },
    technologies : {
        type : String ,
        required : true 
    },
    stack : {
        type : String ,
        required : true 
    },
    gitRepoLink : String ,
    deployedLink : String ,
    deployed : String
})

module.exports = mongoose.model("Project",projectSchema)