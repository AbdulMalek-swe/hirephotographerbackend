const photographer = require('../controller/photographer.controller')
const { verifyToken } = require('../middleware/verifyToken')
 
const router = require('express').Router()
  
router
.route("/photographer")
.get(photographer.getPhotographer)
.post(photographer.postPhotographer)
router
.route("/photographer/:id")
.post(verifyToken, photographer.updateUserOrderPhotographer)
router
.route("/photographer/:id")
.delete(photographer.deletePhotographer)
.patch(photographer.statusPhotographer)
router
.route("/photographer/rating/:id")
.patch(photographer.ratingPhotographer)
 
module.exports = router