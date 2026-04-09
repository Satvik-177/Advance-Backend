import express from "express"
import dotenv from "dotenv"
import connectToDb from "../prac_backend_code/src/config/db.js"
import authRoutes from "./src/Routes/auth.routes.js"
import { errorHandler } from "./src/middlewares/error.middleware.js"
import userRoutes from "./src/Routes/user.routes.js"

dotenv.config()

let port = process.env.PORT

const app = express()

app.use(express.json())

app.use("/uploads", express.static("uploads")); 

app.use("/api/auth",authRoutes)
app.use("/api/users",userRoutes)
app.use(errorHandler)

const startServer = async(req,res)=>{

    await connectToDb();

    app.listen(port,()=>{
        console.log(`Server is listening on port ${port}`)
    })

}

startServer();