import { secretKey } from "../constant.js"
import jwt from "jsonwebtoken"
let isAuthenticated=async(req,res,next)=>{
  try {
    let tokenString=req.headers.authorization
    let token= tokenString.split(" ")[1]

    let user=await jwt.verify(token,secretKey)
    req._id=user.id
    next()
  } catch (error) {
    res.status(403).json({
        success:false,
        message:"token not valid"
    })
  }
}
export default isAuthenticated