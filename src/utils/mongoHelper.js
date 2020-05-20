const mongoose = require('mongoose');
const logger = require('./logger');

exports.connectToMongoDB = async (mongoConnectionString) => {
    // Capture groups
    // 0: entire thing
    // 1: user
    // 2: password
    // 3: host
    // 4: hostname
    // 5: port
    // 6: path
    // 7: query params
    const split = mongoConnectionString.match(/^mongodb:(?:(?:\/{2})(\S+?):(\S+?)?@)?(([\S]+?):?(\d+)?)(\/[\S]+?)?(\?\S+?)?$/);
        
    logger.info(`Connecting to mongo DB at ${split[3]}`);
    const conn = await mongoose.connect(mongoConnectionString, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false,
        useUnifiedTopology: true
    });
    console.log(`MongoDB Connected to ${conn.connection.host}`);
};