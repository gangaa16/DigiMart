const mongoose = require("mongoose"); // Erase if already required

// Declare the Schema of the Mongo model
var otpSchema = new mongoose.Schema(
  {
    email:{
        type: String,
      required: true,
      unique:true
    },
    otp:{
        type:String,
        required : true
    }
  }
)

//Export the model
module.exports = mongoose.model("userOtp", otpSchema);

