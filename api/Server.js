import express from 'express'
import taskrouter from './router.js'
import { connectDB } from './src/config/dbConfig.js'
import cors from 'cors'
import morgan from 'morgan'

const app = express()
const PORT =  8000

// DB Connection 

connectDB()

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


app.listen(PORT, (error)=>{
    error ? console.log(error) : console.log(`server is running at http://localhost:${PORT}`)
})