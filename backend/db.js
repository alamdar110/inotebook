const mongoose = require('mongoose');
const mongoURI = 'mongodb://localhost:27017';

const connectToMongo = async() => {
    try {
        mongoose.set("strictQuery", false);
        mongoose.connect(mongoURI);
        console.log("Connected to mongoDB successfully");
    } catch (error) {
        console.log(error);
        process.exit();
    }
};

exports.connectDb = connectToMongo;