import express from "express"
import { register } from "../Controllers/auth.controller.js"
import { login } from "../Controllers/auth.controller.js"

const authRoutes = express.Router()

authRoutes.post("/register",register)
authRoutes.post("/login",login)

export default authRoutes