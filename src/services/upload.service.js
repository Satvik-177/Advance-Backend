import cloudinary from "../config/cloudinary.js"
import fs from "fs"

export const uploadToCloudinary = async(filePath) =>{

    const result = await cloudinary.uploader.upload(filePath,{
        folder: "users",
    });

    fs.unlinkSync(filePath) // deleted local files

    return result
}