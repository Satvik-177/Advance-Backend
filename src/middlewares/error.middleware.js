export const errorHandler = (err,req,res,next) =>{

    //if statusCode is not set in controllers,protect middlewares, then bydefault it sets it to 200, so handled that

    const statusCode = res.statusCode === 200 ? 500 : res.statusCode

    res.status(statusCode).json({
        success:false,
        message:err.message || "server error",
        stack: process.env.NODE_ENV === "production" ? null : err.stack
    });
};