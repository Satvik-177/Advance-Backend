import { registerUser, userRefreshToken } from "../services/auth.service.js"
import { userLogin } from "../services/auth.service.js";
import { asyncHandler } from "../utils/asyncHandler.js";

//accepts requests
export const register = asyncHandler(async(req,res)=>{

    //call services
    const user = await registerUser(req.body)

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

    const {accessToken,refreshToken,user} = await userLogin(req.body)

    res.status(200).json({
        success:true,
        accessToken,
        refreshToken,
        user
    });
});

export const refreshAccessToken = asyncHandler(async(req,res,next)=>{

    const accessToken = await userRefreshToken(req.body)

    res.json({
        success:true,
        accessToken
    })
})

export const logout = asyncHandler(async(req,res)=>{

    await logoutUser(req.user.id)

    res.status(200).json({
        success:true,
        message:"Logged out successfully"
    });
});
