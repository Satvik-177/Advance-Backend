import { protect } from "../middlewares/auth.middleware.js"
import { upload } from "../middlewares/upload.middleware.js"
import express from "express"
import uploadImage from "../Controllers/user.controller.js"


// Big Picture:
// Multer = request se file nikalna + validate karna + save karna + req.file mei dena

const userRoutes = express.Router()

userRoutes.post("/upload",protect,upload.single("image"),uploadImage)

export default userRoutes
