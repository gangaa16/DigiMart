const mongoose = require("mongoose"); // Erase if already required

// Declare the Schema of the Mongo model
var orderSchema = new mongoose.Schema(
  {
    user:{
      type:mongoose.Schema.Types.ObjectId,
      ref:"User",
      required:true
    },
    shippingInfo:{
      firstName:{
        type:String,
        required:true
      },
      lastName:{
        type:String,
        required:true
      },
      city :{
        type:String,
        required:true

      },
      state:{
        type:String,
        required:true
      },
      other:{
        type:String,
        required:true
      },
      pincode:{
        type:Number,
        required:true
      }
    },
    paymentInfo:{
      razorepayOrderId:{
        type:String,
        required:true
      },
      razorepayPaymentId:{
        type:String,
        required:true
      }
    },
    orderItems:[
      {
        product:{
          type:mongoose.Schema.Types.ObjectId,
          ref:"product",
          required:true,
        },
        color:{
          type:mongoose.Schema.Types.ObjectId,
          ref:"Color",
          required:true,

        },
        quantity:{
          type:Number,
          required:true,

        },
        price:{
          type:Number,
          required:true,

        }
      }
    ],
    paidAt :{
      type:Date,
      default:Date.now()
    },
    totalPrice:{
      type:Number,
      required:true
    },
    totalPriceAfterDiscount:{
      type:Number,
      required:true

    },
    orderStatus:{
      type:String,
      default:"ordered"
      
    }
    
  },{
    timestamps: true,
  }
);

//Export the model
module.exports = mongoose.model("Order", orderSchema);
