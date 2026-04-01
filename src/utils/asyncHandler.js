//Promise => Future result
//3 states hoti hain:
// Pending → Resolve (success) ✅
//         → Reject (error) ❌


// fun() => controller function
//fun(data) -> return data
// 👉 async function hamesha Promise return karta hai
export const asyncHandler = (fn) => (req,res,next)=>{
    Promise.resolve(fn(req,res,next)).catch(next) //directly resolves the promise
                                                // catch will not execute in that case
}