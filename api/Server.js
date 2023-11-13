import dotenv from 'dotenv'
dotenv.config()
import express from 'express'
import taskrouter from './router.js'
import { connectDB } from './src/config/dbConfig.js'
import cors from 'cors'
import morgan from 'morgan'

const app = express()
const PORT = process.env.PORT || 8000; 

// DB Connection 

connectDB()

// setup static content serve 
import path from 'path'
const __dirname = path.resolve()
app.use(express.static(__dirname + "/build"))


app.use(express.json())
app.use(cors())
app.use(morgan("dev"))

app.use("/api/v1/task", taskrouter)
// direct way would be :  app.use("/", (req, res) => {
//  res.jsonjson({
//         status: "sucess",
//         message: "still to do"
//     })
// // })
app.use("/", (req, res) => {
    res.sendFile(__dirname + "index.html")
})



app.listen(PORT, (error)=>{
    error ? console.log(error) : console.log(`server is running at http://localhost:${PORT}`)
})