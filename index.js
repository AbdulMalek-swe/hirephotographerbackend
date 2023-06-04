var colors = require('colors');
var env = require('dotenv').config();
 
const { dbConnect } = require('./utils/dbConnect');
const app = require('./app');
  dbConnect()
 
app.listen(process.env.PORT, () => {
    console.log(`port running on ${process.env.PORT}`.red);
})
