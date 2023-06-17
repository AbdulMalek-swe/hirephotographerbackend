var mongoose = require('mongoose');
module.exports.dbConnect = () => {
    mongoose
        .connect(process.env.MONGO_DB_CONNECTION_NAME)
        .then(res => console.log("DATABASE CONNECTED".cyan))
        .catch(err => console.log("err",err.message)) 
}