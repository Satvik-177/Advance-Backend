import mongoose from "mongoose"

const connectToDb = async(req,res)=>{

    try{
        await mongoose.connect(process.env.MONGO_URI)
        console.log("MongoDB connected")
    }
    catch(err){
        console.log(`Error:${err}`)
        process.exit(1)
    }
}

export default connectToDb