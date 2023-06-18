const jwt = require("jsonwebtoken");
const {promisify} = require("util");
module.exports.verifyToken = async(req,res,next) =>{
    try{  
        const token = req.headers.authorization.split(" ")[1];
        if(!token){
            return res.status(401).json({
                message: "invalid token",
                error: error.message
              })
            }
            const decode = await promisify(jwt.verify)(token,process.env.SECRET_JWT_KEY);
             req.user = decode
           
            next();
    }
    catch(error){
        res.status(403).json({
            message: "invalid token",
            error: error.message
          })
    }
}