import mongoose from 'mongoose';

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name is Required"],
        maxLength: [25, "Name Must be less than 25 Character"]
    }
})