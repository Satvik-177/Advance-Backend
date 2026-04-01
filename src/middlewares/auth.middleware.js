import jwt from "jsonwebtoken"
import { asyncHandler } from "../utils/asyncHandler.js";
import User from "../models/user.model.js";

// protect middleware != error middleware (Don't confuse)
//Normal middlewares -> logging, validation, protect
export const protect = asyncHandler(async(err,req,res,next)=>{

    let token;

    if(req.headers.authorization && req.headers.authorization.startsWith("Bearer ")){
        token = req.headers.authorization.split()[1]
    }

    if(!token){
        throw new Error("INAVLID_TOKEN") //let error middleware decide the status code
    }

    let decoded;

    try{
        decoded = jwt.verify(token, process.env.JWT_SECRET)
    }

    //decoded payload
    //{
        //userId: "...",
        //email: "...",
        //iat: ...,
        //exp: ...
   //}

    catch(err){
        throw new Error("INVALID_TOKEN")
    }

    //user variable receives a complete object but after removing password
    const user = User.findById(decoded.userId).select("-password")

    if(!user){
        throw new Error("USER_NOT_FOUND")
    }

    req.user = user

    next()
})