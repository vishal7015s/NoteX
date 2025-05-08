const mongoose = require("mongoose");
require("dotenv").config();

exports.connect = () => {
    mongoose.connect(process.env.MONGODB_URL)
    .then(() => console.log("MongoDB connected successfully"))
    .catch( (error) => {
        console.log("DB connection fail");
        console.log(error.message);
        process.exit(1);
    })
};