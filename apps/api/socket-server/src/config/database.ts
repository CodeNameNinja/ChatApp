import mongoose from 'mongoose';

const connectToDatabase = async () => {
    try {
        const dbUri = process.env.MONGODB_URI || 'mongodb+srv://developer:7mpiEDJ74SQx43eb@chatty.t58knnm.mongodb.net/';
        await mongoose.connect(dbUri);
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('Could not connect to MongoDB:', error);
        process.exit(1);
    }
};

export default connectToDatabase;
