const express = require("express");
const app = express();
const {connectionToDB} = require("./Database/dbConfig");
const {cloudinaryConfig} = require("./Cloudinary/cloudinaryConfig")
const cors = require("cors");
const cookieParser = require("cookie-parser");
const expressFileUploader = require("express-fileupload");
const messageRouter = require("./routes/message")
const userRouter = require("./routes/user")
const resetPasswordRouter = require("./routes/resetPassword")
const timelineRouter = require("./routes/timeline")
const toolRouter = require("./routes/tool")
const skillRouter = require("./routes/skill")
const projectRouter = require("./routes/project")


require("dotenv").config() ;
const PORT = process.env.PORT ;

app.use(express.json());
app.use(cookieParser());
app.use(expressFileUploader({
    useTempFiles : true,
    tempFileDir : '/tmp/'
}))
app.use(cors({
    origin : ["http://localhost:5173","http://localhost:5174"],
    credentials : true 
}))

app.use("/api/v1/message",messageRouter)
app.use("/api/v1/user",userRouter)
app.use("/api/v1/user/resetPassword",resetPasswordRouter)
app.use("/api/v1/timeline",timelineRouter)
app.use("/api/v1/tool",toolRouter)
app.use("/api/v1/skill",skillRouter)
app.use("/api/v1/project",projectRouter)

cloudinaryConfig();
connectionToDB();
app.listen(PORT , ()=>{
    console.log(`Server is listening to PORT ${PORT}`)
})