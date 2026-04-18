import { protect } from "../middlewares/auth.middleware.js"
import { upload } from "../middlewares/upload.middleware.js"
import express from "express"
import { uploadImage } from "../Controllers/user.controller.js"
import { authorize } from "../middlewares/authorize.middleware.js"

// Big Picture:
// Multer = request se file nikalna + validate karna + save karna + req.file mei dena

const userRoutes = express.Router()

userRoutes.post("/upload",protect,upload.single("image"),uploadImage);
userRoutes.delete(
    "/:id", // "/:id" -> dynamic param ,  //DELETE /api/users/123
    protect, //jwt verification and will set req.user

    //Server start
    //authorize("admin") call hota hai
             // ↓
//middleware function return hota hai
    authorize("admin"),
    deleteUser  //delete operation in database
);

export default userRoutes

