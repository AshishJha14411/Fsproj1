import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please enter a product name"],
      trim: true,
      maxLength: [120, "Product name should of max 120 characters"],
    },
    price: {
      type: Number,
      required: [true, "Please enter a product product"],
      trim: true,
      maxLength: [5, "Product price should not exceed 5 digits"],
    },
    description:{
        type: String,
        //use some form of wsiyg editor- assignment
    },
    photos:[{
        secure_url: {
            type: String,
            required: true
        }
    }],
    stocks: {
        type: Number,
        default: 0
    },
    sold: {
        type:Number,
        default: 0
    },
    collectionId: {
        //we need to have a collection linkage
        //general form mongose.Schema.Types.ObjectID
        type: mongoose.Schema.Types.ObjectId,
        ref: "Collection"
    }
},
  {
    timestamps: true,
  }
);

export default mongoose.model("product", productSchema);