import multer from "multer"
import path from "path"

const storage = multer.diskStorage({

    destination:function(req,file,cb){
        cb(null,"uploads/")
    },

    filename:function(req,file,cb){
        //originalname => that client sends
        const uniqueName = Date.now() + "-" + file.originalname.replace(/\s+/g, "-")
        cb(null,uniqueName)
    }

});

//filter logic
const fileFilter = (req,file,cb)=>{
    const allowedTypes = ["image/jpeg", "image/png", "image/jpg"]

    if(allowedTypes.includes(file.mimetype)){
        cb(null, true)
    }
    else{
        cb(new Error("Only images are allowed"),false);
    }
};

export const upload = multer({
    storage,
    fileFilter
})