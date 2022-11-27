import mongoose, { mongo } from "mongoose";
import AuthRoles from "../utils/authRoles";
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
    select: false,
  },
  role: {
    type: String,
    enum: Object.values(AuthRoles),
    default: AuthRoles.USER,
  },
  forgotPasswordToken: String,
  forgotPasswordExpiry: Date,
},
{
    timestamps: true
}
);

export default mongoose.model("User", userSchema)