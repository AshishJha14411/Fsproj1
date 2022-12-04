//Higher order function
//normal fn is const something = (fn) => {}
//HoF fn is const something = (fn) => async() => {}
const asyncHandler = (fn) => async (req, res, next) => {
    try {
        await fn(req,res,next)
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}




export default asyncHandler