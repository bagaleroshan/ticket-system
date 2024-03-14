import express, { json } from "express"
import connectToMongoDb from "./src/connectDB/connectToMongoDb.js"
import { port } from "./constant.js"
import { registerRouter } from "./src/routes/registerRouter.js"
let expressApp=express()
connectToMongoDb()
expressApp.listen(port,()=>{
    console.log(`ticket system app is listening at port ${port}`)
})
expressApp.use(json())
expressApp.use("/registers",registerRouter)