const express = require('express');
const cors = require("cors");
const app = express();
app.use(express.json()); 
app.use(cors())
app.use("/images", express.static("images"))
app.use(express.urlencoded({ extended: true }))
const userRoute = require('./route.config/user.route');
const photographerRoute = require('./route.config/photographer.route');
 
 
// const productRoute = require('./routes/product.routes');
 app.use("/api/v1/",userRoute)
 app.use("/api/v1/",photographerRoute)
 
//    app.use("/api/v1/product",productRoute)
 
module.exports = app;