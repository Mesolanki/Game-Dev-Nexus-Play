const mongoose = require("mongoose");
require("dotenv").config(); // 🛠️ Load env variables

// 🛠️ USE URI FROM .ENV
const uri = process.env.MONGO_URI;

const connectDB = async () => {
    try {
        await mongoose.connect(uri);
        console.log(">>> [System]: Connection to Database Established");
    } catch (error) {
        console.error(">>> [Critical_Error]: Database Connection Failed:", error.message);
        process.exit(1); 
    }
};
connectDB();

module.exports = mongoose.connection;