const mongoose = require('mongoose');
// connectDB
const connectDB = async () =>{
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('DB connected');
    } catch (error) {
        console.log(error);
    }
}

module.exports = connectDB;