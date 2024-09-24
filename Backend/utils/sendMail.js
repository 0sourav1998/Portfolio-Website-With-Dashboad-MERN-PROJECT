const nodemailer = require("nodemailer");

exports.sendMail = async(email,title,body)=>{
    try {
        const transporter = nodemailer.createTransport({
            host : process.env.MAIL_HOST ,
            auth : {
                user : process.env.MAIL_USER ,
                pass : process.env.MAIL_PASS
            }
        })

        const info = await transporter.sendMail({
            from : "sourav.1998.usb.sb@gmail.com",
            to : `${email}`,
            subject : `${title}` ,
            html : `${body}`
        }) 
        console.log("INFO",info);
        return info ;
    } catch (error) {
        return res.status(400).json({
            success : false ,
            message : "Error While Sending Mail"
        })
    }
}