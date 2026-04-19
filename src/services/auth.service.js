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

    const refreshSecret = process.env.JWT_REFRESH_SECRET

    const accessTokenOptions = {
        expiresIn:"2d"
    };

    const refreshTokenOptions = {
        expiresIn:"7d"
    };

    const accessToken = jwt.sign(payload,jwtSecret,accessTokenOptions)

    const refreshToken = jwt.sign(payload,refreshSecret,refreshTokenOptions)

    user.refreshToken = refreshToken

    await user.save()

    return ({
        accessToken,
        refreshToken,
        user:{
            id:user._id,
            email:user.email
        }
    })
       //internally -> return Promise.resolve( {token,user} )
}

export const userRefreshToken = async(refreshToken)=>{

    if(!refreshToken){
        throw new Error("No refresh token")
    }

    const decoded = jwt.verify(
        refreshToken,
        process.env.JWT_REFRESH_SECRET
    )

    const user = await User.findById(decoded.id)

    if(!user || user.refreshToken !== refreshToken){
        throw new Error("Invalid refresh token")
    }

    const newAccessToken = jwt.sign(

        {id:user._id},
        process.env.JWT_SECRET,
        {expiresIn:"15m"}
    );

    return newAccessToken
}

export const logoutUser = async(userId)=>{

    const user = await User.findById(userId)

    if(!user){
        throw new Error("user not found")
    }

    user.refreshToken = null;  //session ends

    await user.save();
};