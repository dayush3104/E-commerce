import mongoose from "mongoose";

const connectDB = async ()=>{
    try {
        const conn = await mongoose.connect(`${process.env.MONGO_URL}`);
        console.log(`<<< [db.js] >>> SUCCESSFULLY CONNECTED TO DATABASE : ${conn.connection.host} >>>`);
    
    } catch (error) {
        console.error(`<<< [db.js] >>> FAILED TO CONNECT TO DATABASE : ${error} >>>`);
    }
}

export default connectDB;
