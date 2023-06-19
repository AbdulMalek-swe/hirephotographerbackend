const mongoose = require("mongoose");
const validator = require("validator");
const photographerSchema = mongoose.Schema(
  {
    email: {
      type: String,
      validate: [validator.isEmail, "Provide a valid Email"],
      trim: true,
      lowercase: true,
      unique: true,
      required: [true, "Email address is required"],
    },
    name: {
      type: String,
      required: [true, "Please provide a first name"],
      trim: true,
      minLength: [3, "Name must be at least 3 characters."],
      maxLength: [100, "Name is too large"],
    },
     
    contactNumber: {
      type: String,
      validate: [validator.isMobilePhone, "Please provide a valid contact number"],
    },
    pdfLink: {
      type: String,
      // validate: [validator.isURL, "Please provide a valid url"],
    },
    rating:{
        type:Number,
        default:5
    },
    status:{
        type:String,
        value:['available','unavailable'],
        default:"available"
    },
    amount:{
        type:Number,
        
    },
    activeStatus:{
        type:String,
        value:[true,false],
        default:false
    },

  },
  {
    timestamps: true,
  }
);
const Photographer = mongoose.model("Photographer", photographerSchema);
module.exports = Photographer;