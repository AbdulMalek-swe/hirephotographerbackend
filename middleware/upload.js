const multer = require("multer");
const path = require("path");
const storage = multer.diskStorage({
  destination:"images/",
  filename:(req,file,cb)=>{
    const imageName = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, imageName + file.originalname )
  }
})
  const upload = multer({   
   storage:storage,
    fileFilter:(req,file,cb)=>{
     const supportedImage = /jpeg|png|jpg/;
     const result = supportedImage.test(path.extname(file.originalname))
      if(result){
             cb(null,true)
      }
      else{
        cb(new Error("must be png jpg jpeg file"))
      }
    },
    limits:{
      fileSize:5*1024*1000
    }
})
module.exports = upload;