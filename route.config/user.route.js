const user = require('../controller/user.controller')
const upload = require('../middleware/upload')
const { verifyToken } = require('../middleware/verifyToken')

const router = require('express').Router()
  
router.post("/signup",user.postSignUp)
router.post("/login",user.postSignIn)
router.get("/user/detail",verifyToken, user.getUser)
router.post("/contact", user.userSendMessage)
router.post("/upload-user", upload.single("file"),  user.uploadPhoto)
router.post("/payment",    user.payment)
router.post("/payment/confirm",    user.paymentConfirm)
module.exports = router