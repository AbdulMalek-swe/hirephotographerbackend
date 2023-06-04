const user = require('../controller/user.controller')
const { verifyToken } = require('../middleware/verifyToken')

const router = require('express').Router()
  
router.post("/signup",user.postSignUp)
router.post("/login",user.postSignIn)
router.get("/user/detail",verifyToken, user.getUser)
module.exports = router