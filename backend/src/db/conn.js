const mongoose = require('mongoose');
// Load environment variables from config.env
require('dotenv').config({ path: './config.env' });

const connectDB = async () => {
    try {
        const uri = process.env.MONGODB_URI;
        if (!uri) {
            throw new Error('MONGODB_URI is not defined in the config.env file');
        }

        // Attempt to connect to MongoDB
        await mongoose.connect(uri);
        
        // Log if the connection is successful
        console.log('MongoDB connected successfully!'); 
    } catch (error) {
        console.error('MongoDB connection failed:', error.message);
        process.exit(1); // Exit process with failure
    }
};

// Call the connectDB function to establish the connection
connectDB();

module.exports = connectDB;
