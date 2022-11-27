import mongoose, { mongo } from "mongoose";
import AuthRoles from "../utils/authRoles";
import bcrpyt from'bcryptjs'
import JWT from 'jsonwebtoken'
import crypto from "crypto"


const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is Required"],
    maxLength: [25, "Name Must be less than 25 Character"],
  },
  //trim it donw, either front or backend
  email: {
    type: String,
    required: [true, "Email is Required"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Password is Required"],
    maxLength: [6, "Password must be atleast 6 Characters"],
    //this will not select the password when we send the data back. so we wont have to assign it undefined when it is sent
    select: false,
  },
  role: {
    type: String,
    //basic js. do revision if not understood
    enum: Object.values(AuthRoles),
    //assigning default role of user
    default: AuthRoles.USER,
  },
  forgotPasswordToken: String,
  forgotPasswordExpiry: Date,
},
{
    //can be used to create timestaps 
    timestamps: true
}
);

//challenge 1 - encrpty password

userSchema.pre("save", async function(next){
    if(!(this.modified("password"))) return next()
    this.password = await bcrpyt.hash(this.password, 10)
    next()
})

export default mongoose.model("User", userSchema)