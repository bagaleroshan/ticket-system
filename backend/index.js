import express, {json} from "express"
import cors from "cors"
import connectToMongoDB from "./src/connectDB/connectToMongoDB.js"
import { port } from "./src/constant.js"
import registerRouter from "./src/router/registerRouter.js"
import movieTicketRouter from "./src/router/movieTicketRouter.js"
let expressApp=express()
// expressApp.use(cors())
expressApp.use(cors())
expressApp.use(json())
connectToMongoDB()

expressApp.use("/registers",registerRouter)
expressApp.use("/movie-tickets",movieTicketRouter)
expressApp.listen(port,()=>{
    console.log(`app is listening at port ${port}.`)
})