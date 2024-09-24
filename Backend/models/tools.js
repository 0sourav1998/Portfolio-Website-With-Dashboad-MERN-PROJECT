const mongoose = require("mongoose");

const toolsController = new mongoose.Schema({
    toolImage : {
        type : String , 
        required : true
    },
    name : {
        type : String ,
        required : true
    }
})

module.exports = mongoose.model("Tools",toolsController)