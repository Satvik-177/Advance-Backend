// below function will create middleware
export const authorize = (...roles) =>{   // ["admin","user"]
    // ...roles → multiple arguments ko ek array mei convert karta hai
    return (req,res,next)=>{  //this is actual middleware function

        if(!roles.includes(req.user.role)){
            res.status(403);
            throw new Error("Access denied")
        }

        next();
    };
};