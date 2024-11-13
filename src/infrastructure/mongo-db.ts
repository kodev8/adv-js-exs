import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const connectToMongoDB = async () => {
    try {
        mongoose.connect(process.env.MONGO_URI as string);
        console.log('Connected to DB');
    } catch (error) {
        console.log('Error connecting to DB', error);
        process.exit(1);
    }
};

export default connectToMongoDB;
