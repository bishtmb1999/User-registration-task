const mongoose = require("mongoose")
const userSchema = new mongoose.Schema(
    {
        firstName: {
            type: String,
            required: true,
            trim: true
        },

        lastName: {
            type: String,
            required: true,
            trim: true
        },
        email: {
            type: String,
            trim: true,
            required: true

        },
        country:{
            type:String,
            required: true

        },
        gender: {
            type: String,
            required: true,
            enum: ["Male", "Female", "LGBT"]
          },
       state:{
            type:String,
            required: true

        },
        city:{
            type:String,
            required: true

        },
        dob:{
            type:String,
            required: true

        },
        age:{
            type:Number,
            required: true

        },

        },
        {timestamps: true},

);

module.exports = mongoose.model('user', userSchema)

