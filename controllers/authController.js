import User from "../modals/user.schema";
import asyncHandler from "../services/asyncHandler";
import CustomError from "../services/customError";

export const cookieOptions = {
    expiresIn: new Date(Date.now() + 3 *24 * 60*60*1000),
    httpOnly: true
    // could be in sparate file in utils
}

/*******************************************  
* @SignUp
* @route http://localhost:4000/api/auth/singup
* @description User Signup controller for creating a SignUp
* @parameter
* @retuns User Object 
********************************************/

export const singUp = asyncHandler(async(req,res)=> {

    const {name,email, password} = req.body
    if(!name||!email || !password){
        throw new CustomError("Please fill all fields", 400)
    }
    //check if user exists
    const userExists = await User.findOne({email})
    if(userExists){
        throw new CustomError("User already Exists", 400)
    }
//when quering the database all the field will be given,when selecting it it will not be selected due to select:false
    const user = await User.create({
        name,
        email,
        password
    })
    const token = user.getJwtToken
    user.password = undefined

    res.cookie("auth-token", token, cookieOptions)
})