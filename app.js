const express = require('express');
const cors = require("cors");
const userRoute = require('./route.config/user.route');
const photographerRoute = require('./route.config/photographer.route');
const app = express();
app.use(express.json()); 
app.use(cors())
 
// const productRoute = require('./routes/product.routes');
 app.use("/api/v1/",userRoute)
 app.use("/api/v1/",photographerRoute)
 
//    app.use("/api/v1/product",productRoute)
 
module.exports = app;