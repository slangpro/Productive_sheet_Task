const { createTransport } = require("nodemailer");
// const multer = require('multer')


//Configuring Multer 
// Storing the files in the folder
// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, "/images");
//     },
//     filename: function (req, file, cb) {
//         cb(null, file.originalname);
//     },
// });

// to store the files in the destination folder
// const uploads = multer({
//     storage: storage,
// });

exports.sendMail = async (req, res) => {
    try {
        const {  emailTo, subject  , text , cc  , bcc , } = req.body;
        // path = req.file.path
        // filename = req.file.originalname
        console.log(req.body)

    // create reusable transporter object using the default SMTP transport
    const transporter = createTransport({
        service : 'gmail',
        auth: {
            user : 'brijeshvishwakarma@nimapinfotech.com',
            pass : 'Brijesh@7641'
        }
    })
    //All Message in mail
    const mailData = {
        from : "brijeshvishwakarma@nimapinfotech.com",
        to : emailTo,
        cc : cc,
        bcc : bcc,
        subject : subject,
        text : text,
        // attachments: [
        //     {   // utf-8 string as an attachment
        //       filename : filename,
        //       path : path
        //     }]
    }
    console.log("ara h");
    //Sending Mail
       await transporter.sendMail(mailData, function(err,info) {
        if(err){
            console.log('not working ')
            return res.status(400).json(err.message)
        }
        else {
            console.log('Email sent success')
            return res.status(200).json({
                message : `Email Sent Successfully to ${mailData.to}`
            })
        }
    })
    } catch (error) {
        return error
    }

}


