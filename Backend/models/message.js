const mongoose = require("mongoose");

const messageController = new mongoose.Schema({
    senderName : {
        type : String ,
        minLength : [2 , "Sender name cannot less than 2 Characters"]
    },
    subject : {
        type : String ,
        minLength : [2 , "Subject cannot less than 2 Characters"]
    } ,
    message : {
        type : String ,
        minLength : [2 , "Message cannot less than 2 Characters"]
    },
    createdAt : {
        type : Date ,
        default : Date.now()
    }
})

module.exports = mongoose.model("Message",messageController)