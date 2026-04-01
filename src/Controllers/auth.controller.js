import { registerUser } from "../services/auth.service.js"
import { userLogin } from "../services/auth.service.js";
import { asyncHandler } from "../utils/asyncHandler.js";

//accepts requests
export const register = asyncHandler(async(req,res)=>{

    //call services
    const user = registerUser(req.body)

    //send response
    res.status(201).json({
        success:true,
        message:"User created successfully",
        user:{
            id:user._id,
            email:user.email
        }
    });
});

export const login = asyncHandler(async(req,res)=>{

    const {user,token} = userLogin(req.body)

    res.status(200).json({
        success:true,
        message:"User logged in successfully",
        token,
        user:{
            id:user._id,
            email:user.email
        }
    });
});
