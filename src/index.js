import dotenv from "dotenv"
import { connectDB } from "./db/db.js"
import { app } from "./app.js"

dotenv.config({
    path:"./.env"
})

const PORT=process.env.PORT

connectDB()
.then(()=>{
    app.on("error",(err)=>{
        console.log(`ERROR ::: ${err}`)
    })

    app.listen(PORT,()=>{
        console.log(`Server Running on PORT : ${PORT}`)
    })
})