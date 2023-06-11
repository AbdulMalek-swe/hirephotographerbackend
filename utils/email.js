const nodemailer = require("nodemailer");
const { google } = require("googleapis");

const oAuth2Client = new google.auth.OAuth2(
  process.env.CLIENT_ID,
  process.env.CLIENT_SECRET,
  "https://developers.google.com/oauthplayground"
);
oAuth2Client.setCredentials({ refresh_token: process.env.REFRESH_TOKEN }); 

module.exports.sendMailWithGmail = async (data) => {
   try{
    const accessToken = await oAuth2Client.getAccessToken();

    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: process.env.SENDER_MAIL,
        clientId: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        refreshToken: process.env.REFRESH_TOKEN,
        accessToken: accessToken,
      },
    });
 
    const mailData = {
      from: process.env.SENDER_MAIL, // sender address
      to: data.to, // list of receivers
      subject: data.subject,
      text: data.text,
      html: ` ${data.text} 
          `,
    };
    // console.log(mailData);
    let info = await transporter.sendMail(mailData);
 
    // console.log("Message sent: %s", info.messageId);
 
    // console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    //      console.log(info);
    return info.messageId;
   }
   catch(error){
        console.log(error.message)
   }
};
