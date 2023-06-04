const User = require("../model/user.model");
const { postSignInService, findUserByEmail } = require("../services/user.service");
const { generateToken } = require("../utils/token");

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