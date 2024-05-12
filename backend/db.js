const mongoose = require('mongoose');
const mongoURI = 'mongodb://localhost:27017/admin';

const connectToMongo = async() => {
    try {
        mongoose.set("strictQuery", false);
        await mongoose.connect(mongoURI);
        console.log("Connected to mongoDB successfully");
    } catch (error) {
        console.log(error);
        process.exit();
    }
};

exports.connectDb = connectToMongo;