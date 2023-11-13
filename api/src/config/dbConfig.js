import mongoose from 'mongoose'

export const connectDB = async () => {
    try {
        // const dbUrl = "mongodb://localhost:27017/ntdl_db_v2";
        // const dbUrl = "mongodb://localhost:27017/ntdl_db_v2";
        const con = await mongoose.connect(process.env.MONGO_URL)

        con.connections && console.log(" MongoDB Conncted")
    } catch (error) {
       console.log(error) 
    }
}