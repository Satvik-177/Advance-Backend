import { asyncHandler } from "../utils/asyncHandler.js";
import { uploadToCloudinary } from "../services/upload.service.js";

// const uploadImage = asyncHandler(async(req,res)=>{

//     if(!req.file){  
//         res.status(400)
//         throw new Error("No file uploaded")
//     }
    
//     else{
//         res.status(200).json({
//             success:true,
//             file:req.file
//         });
//     }
// })

// export default uploadImage

//what is req.file
// req.file = {
//   fieldname: "image",
//   originalname: "profile.png",
//   encoding: "7bit",
//   mimetype: "image/png",
//   destination: "uploads/",
//   filename: "171234-profile.png",
//   path: "uploads/171234-profile.png",
//   size: 12345
// }

export const uploadImage = asyncHandler(async(req, res)=>{

    if(!req.file){
        res.status(400);
        throw new Error("No file uploaded");
    }

    const result = await uploadToCloudinary(req.file.path)

//     //result = {
//    secure_url: "https://res.cloudinary.com/.../image.png",
//    public_id: "users/abc123"
//    }

    res.status(200).json({
        success:true,
        imageUrl:result.secure_url
    })
})