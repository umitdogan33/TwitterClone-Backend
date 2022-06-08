const eventEmitter = require("./eventEmitter")
const nodemailer = require("nodemailer");

module.exports = () =>{
eventEmitter.on("send_email",(emailData)=>{
    let transporter = nodemailer.createTransport({
        // host: process.env.EMAIL_HOST,
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        secure: false,
        service:"gmail",
        requireTLS: true,
        auth: {
            user: process.env.EMAIL_USER, // generated ethereal user
            pass: process.env.EMAIL_PASSWORD, // generated ethereal password
        },
    });

    let info = transporter.sendMail({
        from: process.env.EMAIL_FROM, // sender address
        ...emailData,
    });
})
}