import mongoose from 'mongoose';
require('dotenv').config();

export const connectDB = async () => {
    try {
        mongoose.connect(
            process.env.MONGO_URI as string,
            {
                autoIndex: false, // Don't build indexes,
                serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
                socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
                family: 4 // Use IPv4, skip trying IPv6
            },
            () => console.log('DB Connected Successfully')
        );
    } catch (err) {
        console.log('Failed to connect to DB', err)
    }
}
