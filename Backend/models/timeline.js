const mongoose = require("mongoose");

const timelineController = new mongoose.Schema({
    title : {
        type : String ,
        required : true
    },
    description : {
        type : String ,
        required : true ,
    },
    timeline : {
        from : {type : String , required : true},
        to : String
    }
})

module.exports = mongoose.model("Timeline",timelineController)