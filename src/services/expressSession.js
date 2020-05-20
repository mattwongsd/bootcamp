const config = require('../config');
const session = require('express-session')
const redis = require('redis')
 
const RedisStore = require('connect-redis')(session)

const redisOpts = {
  host: "localhost",
  port: 6379,
}

let redisClient = redis.createClient(redisOpts)
const sessionConfig = {
  secret: config.EXPRESS_SESSION_SECRET,
  // Sets the session cookie to expire after 7 days.
  maxAge: 7 * 24 * 60 * 60 * 1000,
  cookie: {
    secure: true
  },
  resave: false,
  saveUninitialized: false,
  unset: 'destroy',
  store: new RedisStore({ client: redisClient }),
}

module.exports = session(sessionConfig);