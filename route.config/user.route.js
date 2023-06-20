const user = require('../controller/user.controller')
const upload = require('../middleware/upload')
const { verifyToken } = require('../middleware/verifyToken')

const router = require('express').Router()
  
router.post("/signup",user.postSignUp)
router.post("/login",user.postSignIn)
router.get("/user/detail",verifyToken, user.getUser)
router.post("/contact", user.userSendMessage)
router.get("/contact", user.userGetMessage)
router.post("/contact/send", user.userPostMessage)
router.post("/upload-user",verifyToken , upload.single("img"),  user.uploadPhoto)
router.post("/payment",    user.payment)
router.post("/payment/confirm",verifyToken, user.paymentConfirm)
router.get("/user/detail/:id", user.getUserAll)
module.exports = router