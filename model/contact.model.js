const mongoose = require("mongoose");
const validator = require("validator");
const contactSchema = mongoose.Schema(
  {
    email: {
      type: String,
      validate: [validator.isEmail, "Provide a valid Email"],
      trim: true,
      lowercase: true,
      required: [true, "Email address is required"],
    },
     message:{
       type:String,
       required:[true,'without message not accept it']
     },
    
    rating:{
        type:Number,
        default:5
    },
    
    
    
  },
  {
    timestamps: true,
  }
);
const Contact = mongoose.model("contact", contactSchema);
module.exports = Contact;