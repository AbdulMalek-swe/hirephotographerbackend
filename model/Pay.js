const mongoose = require("mongoose");
const validator = require("validator");
const paymentSchema = mongoose.Schema(
  {
    email: {
      type: String,
      validate: [validator.isEmail, "Provide a valid Email"],
      trim: true,
      lowercase: true,
      required: [true, "Email address is required"],
    },
     payId:{
       type:String,
       required:[true,'without message not accept it']
     }, 
     firstName:{
        type:String,
        required:[true,'without message not accept it']
      }, 
  },
  {
    timestamps: true,
  }
);
const Payment = mongoose.model("payment", paymentSchema);
module.exports = Payment;