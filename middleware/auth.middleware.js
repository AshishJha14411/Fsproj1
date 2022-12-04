import User from "../modals/user.schema.js";
import asyncHandler from "../services/asyncHandler.js";
import CustomError from "../utils/customError.js";
import JWT from "jsonwebtoken";
import config from "../config/index.js";

export const isLoggedIn = asyncHandler(async (req, _res, next) => {
  let token;

  if (
    req.cookies.token ||
    (req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer"))
  ) {
    token = req.cookies.token || req.header.authorization.split(" ")[1]
  }
  if(!token){
    throw new CustomError("Not authorized to access this route", 401)
  }
  try {
    const decodedJwtPayload = JWT.verify(token, config.JWT_SECRET)
    //_id, findUserByid and set this in req.user
    // callign the fields we need to prevent overpopulating the api req
    req.user = await User.findById(decodedJwtPayload._id, "name email role")
    
} catch (error) {
    throw new CustomError("Not Authorized to access this route",401)
  }
  next()
});
