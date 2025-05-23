import mongoose from 'mongoose';
import  {MONGO_URI} from './server-config.js';

async function connectDB() {
    try {
        await mongoose.connect(MONGO_URI);
        console.log("Connected to Database Successfully");
    } catch (error) {
        console.log(error);
        throw error;
    }
}
export default connectDB