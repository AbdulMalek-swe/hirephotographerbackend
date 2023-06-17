const User = require("../model/user.model");
const { postSignInService, findUserByEmail, userImageUploadService, contactService, contactServiceGet } = require("../services/user.service");
const { generateToken } = require("../utils/token");
const nodemailer = require("nodemailer");
const { google } = require("googleapis");
const { sendMailWithGmail } = require("../utils/email");
const path = require("path");
const Photographer = require("../model/photographer.model");
module.exports.postSignUp = async (req, res) => {
  try {
    console.log(req.body);
    if (req.body.role === "admin") {
      return res.status(400).json({
        error: "admin not acceptable in signup method"
      })
    }
    const result = await User.create(req.body)

    if (!result) {
     return res.status(400).json({
        error: "account not create"
      })
    }
    const token = await generateToken(result)
    res.status(200).json({
      message: "successfull",
        access_token: token
    })
  }
  catch (error) {
    res.status(400).json({
      error: error.message
    })
  }
}

module.exports.postSignIn = async (req, res, next) => {
  try {

    if (!req.body.password || !req.body.email) {
      return res.status(501).json({
        error: "email or password is missing"
      })
    }
    const user = await postSignInService(req.body.email);
    if (!user) {
      return res.status(501).json({
        error: "email not found",
      })
    }
    const isPassword = user.comparePassword(req.body.password, user.password)
    if (!isPassword) {
      return res.status(501).json({
        error: "password not found"
      })
    }
    const token = generateToken(user);
    res.status(200).json({
      message: "user find",
      access_token: token
    })
  }

  catch (error) {
    res.status(501).json({
      message: "unAuthorized",
      error: error.message
    })
  }
}

module.exports.getUser = async(req,res,next)=>{
  try{
      const {email }= req.user;
 
      const result = await findUserByEmail(email);
       const {password, ...users}= result.toObject()
      
       if(!result){
        return res.status(501).json({
         error: "not find user",
        })
       }
      res.status(200).json({
        message:"user find successfully",
          user:users,
       })
  }
  catch (error) {
    res.status(501).json({
      message: "unAuthorized",
      error: error.message
    })
  }
}
  // user contact code here 
module.exports.userSendMessage=async(req,res)=>{
  try {
    const contact = await contactService('abdulmalek.swe.585@gmail.com',req.body.message)
    console.log(contact);
    // const mailData = { 
    //   to:['abdulmalek.swe.585@gmail.com'],
    //   subject:"veryfy your token",
    //   text:req.body.message,
    // }
    // await sendMailWithGmail(mailData)
  // const result =  await sendMailWithGmail(mailData)
      res.status(200).json({
        contact
      })
  } catch (error) {
    console.log(error);
  }
}
module.exports.userGetMessage=async(req,res)=>{
  try {
    const contact = await contactServiceGet('abdulmalek.swe.585@gmail.com',req.body.message)
      res.status(200).json({
        contact
      })
  } catch (error) {
    console.log(error);
  }
}

module.exports.uploadPhoto=async(req,res)=>{
  try {
    const file = req.file;
   console.log(path);
    const result = await userImageUploadService(req?.body?.email,file)
    res.status(200).json({
      result:"got success",
      result:result
   })
  } catch (error) {
    console.log(error.message); 
  } 
}

const stripe = require('stripe')('sk_test_51MvGRULyPagBwcPn1TU5Lz4zs5gtiPXOI0mu4fTuB0bCw2nVQaEx6kMhwLDTBYrtM4egGrYPDequW4jT9nxaP0LS00n9kJftIq');
 module.exports.payment = async(req,res)=>{
// StripePaymentView
  try {
    const {id} = req.body;
       const result =await Photographer.findById(id);
       console.log(result);
      const c_amount = result?.amount;
      const intent = await stripe.paymentIntents.create({
        amount: 100 * c_amount,
        currency: 'usd',
        payment_method_types: ['card'],
      });
      // await Charge.create({
      //   // user: req.user,
      //   amount: c_amount,
      //   client_secret: intent.client_secret,
      //   payment_id: intent.id,
      // });
      console.log(" is back");
      res.status(200).json({
        message: 'Payment intent created successfully',
        amount: c_amount,
        payment_id: intent.id,
        client_secret: intent.client_secret,
        publish_key: 'pk_test_51MvGRULyPagBwcPn8cfry3uU9i9gGASSwjiGcTz10T4zUROjvtfdtuyx4NGQYwWX8gRqbAjFV3E9rW4B44WsP161006YllnuPM',
      });
  } catch (error) {
  res.status(400).json({
      error: error.toString(),
    });
  }
 }
 module.exports.paymentConfirm =async(req,res)=>{
try {
      const { payment_id } = req.body;
        res.status(201).json({
          message: 'You successfully subscribed',
          data: {
             id:"this is back id"
          },
        });
      }  
  catch (error) {
   
}
 }