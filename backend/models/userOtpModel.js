const mongoose = require("mongoose"); // Erase if already required


const userOtpSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
      },
      otp:{
        type: String,
        required: true,

      }

})
const userOtp = new mongoose.model("userOtp",userOtpSchema)
module.exports = userOtp;