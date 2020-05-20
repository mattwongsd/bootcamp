require("./config");
const { GraphQLServer } = require("graphql-yoga");
const { connectToMongoDB } = require("./utils/mongoHelper");
const resolvers = require("./resolvers");
const { formatError } = require("apollo-errors");
const { authnMiddleware } = require("./middlewares");
const config = require('./config');
const expressOidc = require('./services/expressOidc');
const { requiresAuth } = require('express-openid-connect');
const fs = require('fs');
const path = require('path');
const logger = require('./utils/logger');
const session = require('./services/expressSession');

const init = async () => {
  await connectToMongoDB(config.MONGO_CONNECTION_STRING);

  const serverOpts = {
    typeDefs: "./src/schema.graphql",
    resolvers,
    // Pass the request object from Express to the graphql resolvers and middlewares
    context: req => ({ ...req }),
    middlewares: [authnMiddleware],
  }

  const options = (() => {
    let opt = {
      formatError,
      endpoint: "/graphql"
    }
    if (config.TLS_ENABLED) {
      opt['https'] = {
        key: fs.readFileSync(path.join(__dirname, config.TLS_KEY_PATH)),
        cert: fs.readFileSync(path.join(__dirname, config.TLS_CERT_PATH))
      }
    }
    return opt;
  })()

  const server = new GraphQLServer(serverOpts);

  // This is to add middleware to the graphql-yoga server
  server.express.use(session);
  server.express.use(expressOidc);
  server.express.get("/auth/callback", (req, res, next) => {
    next();
  })
  // Setup login route because we disabled the defaults for express-oidc
  server.express.get('/auth/login', (req, res) => res.openid.login({ returnTo: '/' }));
  // Override logout handler to destroy user's session
  server.express.get('/auth/logout', (req, res) => {
    req.session.destroy();
    // TODO: Should we logout of the IDP?
    res.openid.logout();
  });
  // server.express.use(requiresAuth());
  // server.express.post("/graphql", myMiddleware())

  server.start(options, () => console.log('Running a GraphQL API server at https://localhost:4000/graphql'));
}


init();

