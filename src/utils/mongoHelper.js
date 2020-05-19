const mongoose = require('mongoose');

exports.connectToMongoDB = async (mongoConnectionString) => {
    const conn = await mongoose.connect(mongoConnectionString, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false,
        useUnifiedTopology: true
    });
    console.log(`MongoDB Connected to ${conn.connection.host}`);
};