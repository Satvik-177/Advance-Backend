import { asyncHandler } from "../utils/asyncHandler.js"

export const validate = asyncHandler(async(req,res,next)=>{

    const result = Schema.safeParse(req.body)

    if(!result.success){
        res.status(400)
        throw new Error(result.error.errors[0].message)
    }

    req.body = res.data;  //only validated data will be received by the controller

    next();
})