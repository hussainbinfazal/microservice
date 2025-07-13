import mongoose from 'mongoose';

const connectDB = async (): Promise<void> => {
    try {
        await mongoose.connect(process.env.MONGODB_URI as string, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        } as mongoose.ConnectOptions);
        console.log('MongoDB connected');
    } catch (error) {
        console.error('MongoDB connection failed:', error);
        process.exit(1);
    }
};

export default connectDB;