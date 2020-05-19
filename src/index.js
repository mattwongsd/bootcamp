const { GraphQLServer } = require("graphql-yoga");
const { connectToMongoDB } = require("./utils/mongoHelper");
const resolvers = require("./resolvers");
const dotenv = require("dotenv").config();
const { formatError } = require("apollo-errors");

const init = async () => {
  await connectToMongoDB(process.env.MONGO_CONNECTION_STRING);

  const options = {
    formatError
  };

  const server = new GraphQLServer({
    typeDefs: "./src/schema.graphql",
    resolvers,
  });
  server.start(options, () => console.log('Running a GraphQL API server at http://localhost:4000/graphql'));
}


init();

