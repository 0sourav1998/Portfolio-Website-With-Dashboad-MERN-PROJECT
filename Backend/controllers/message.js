const Message = require("../models/message");

exports.sendMessage = async (req, res) => {
  try {
    const { senderName, subject, message } = req.body;
    if (!senderName || !subject || !message) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }
    const createdMessage = await Message.create({
      senderName,
      subject,
      message,
    });
    return res.status(201).json({
      success: true,
      message: "Message Sent",
      createdMessage,
    });
  } catch (error) {
    console.log(error.message);
    return res.status(400).json({
      success: false,
      message: "Something Went Wrong While Sending Message",
    });
  }
};

exports.getAllMessages = async(req,res)=>{
    try {
        const messages = await Message.find({});
        return res.status(200).json({
            success : true ,
            message : "MEssages Fetched Successfully",
            messages
        })
    } catch (error) {
        return res.status(400).json({
            success : false ,
            message : "Error while Fetching Messages"
        })
    }
}

exports.deleteMessage = async(req,res)=>{
    try {
        const {messageId} = req.body ;
        if(messageId){
            return res.status(404).json({
                success : false ,
                message : "Message Not Found"
            })
        }
        await Message.findByIdAndDelete(messageId);
        return res.status(200).json({
            success : true ,
            message : "Message Deleted"
        })
    } catch (error) {
        return res.status(400).json({
            success : false ,
            message : "Error while Deleting Messages"
        })
    }
}
