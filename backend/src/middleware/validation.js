let validation=(validationSchema)=>{
    return (req,res,next)=>{
let data=validationSchema.validate(req.body)
let error=data.error
if(error){
    res.status(400).json({
success:false,
message:error.details[0].message
    })
}else{
    next()
}
    }
}
export default validation