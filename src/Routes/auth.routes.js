import express from "express"
import { register } from "../Controllers/auth.controller.js"
import { login } from "../Controllers/auth.controller.js"
import { validate } from "../middlewares/validate.middleware.js"
import { loginSchema, registerSchema } from "../Validators/auth.validator.js"
import { refreshAccessToken } from "../Controllers/auth.controller.js"


const authRoutes = express.Router()

// authRoutes.post("/register",register)
// authRoutes.post("/login",login)

authRoutes.post("/register",validate(registerSchema),register)
authRoutes.post("/login",validate(loginSchema),login)
authRoutes.post("/refresh", refreshAccessToken);
authRoutes.post("/logout",protect,logout)

export default authRoutes