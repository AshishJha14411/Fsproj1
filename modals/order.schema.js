import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
{
    product:{
        type:[
            {
                productId: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "Product",
                    required: true
                },
                count: Number,
                price: Number
            }
        ],
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    phoneNumber: {
        type: Number,
        required: true,
    },
    address:{
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    coupon: String,
    transcationId: String,
    stauts: {
        type: String,
        enum: ["ORDERED", "SHIPPED", "DELIVERED", "cANCELLED"],
        default: "ORDERED",
        //can we imporve that
    }
    //add a payment mode tracking - CoD, gpay, netbanking etc
},
{
    timestamps: true
}
)