import mongoose from "mongoose"

const userSchema = new mongoose.Schema({

    userName:{
        type:String,
        required:true
    },

    email:{
        type:String,
        unique:true,
        maxlength:255
    },

    password:{
        type:String,
        unique:true,
        required:true
    },

    bio:[String],

    About:[
        {
            age:{
                type:Number,
                min:21,
                max:85
            },
            weight:{
                type:Number
            }
        },
    ]
})

const User = mongoose.model("User",userSchema)

export default User