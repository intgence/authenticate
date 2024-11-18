import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();//process.env did not work without this
const connectDB = async() =>{
    try{
        const conn = await mongoose.connect(process.env.MONGO_URI)
        console.log(`MongoDB Connected: ${conn.connection.host}`)
    } catch (err) {
        console.error(`Error: ${err.message}`);
        process.exit(1);
    }
}

export default connectDB;