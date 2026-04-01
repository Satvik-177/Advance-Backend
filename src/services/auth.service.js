import User from "../models/user.model.js"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

// imp: Services must not be aware of our status code, so removed them

export const registerUser = async({ name,email,password })=>{

    const existingUser = await User.findOne({ email })

    if(existingUser){
        throw new Error("User already exists")
    }

    const hashedPassword = await bcrypt.hash(password,10)

    const user = await User.create({
        name,
        email,
        password:hashedPassword
    })

    return user //internally -> return Promise.resolve({user}) since the function is asynchronous
}

export const userLogin = async( {email,password} )=>{

    const user = await User.findOne( {email} )//it returns object to user variable

    if(!user){
        throw new Error("user doesn't exist")
    }

    const matchPassword = await bcrypt.compare(password,user.password)

    if(!matchPassword){
        throw new Error("Invalid credentials")
    }

    const payload = {
        userId:user._id,
        email:user.email
    }

    const jwtSecret = process.env.JWT_SECRET

    const options = {
        expiresIn:"2d"
    };

    const token = jwt.sign(payload,jwtSecret,options)

    return {token,user} //internally -> return Promise.resolve( {token,user} )
}