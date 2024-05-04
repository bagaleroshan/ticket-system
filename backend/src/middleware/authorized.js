import { Register } from "../schema/model.js"

const authorized =( roles)=>{
   return async(req,res,next)=>{
try {
    let id=req._id
    let result=await Register.findById(id)
    let tokenRole=result.roles
    if(roles.includes(tokenRole)){
        next()
    }else{
        let error =new Error("user not authorized")
        throw error
    }
} catch (error) {
    res.status(400).json({
        success:false,
        message:"user not authorized"
    })
}
   }
}
export default authorized