const { GraphQLServer } = require("graphql-yoga");

import { GraphQLScalarType } from "graphql";
import { Kind } from "graphql/language";
import asyncHandler from "./asyncHandler";

const customScalarTypes = {
  Date: new GraphQLScalarType({
    name: "Date",
    description: "Date custom scalar type",
    parseValue(value) {
      return new Date(value); // value from the client
    },
    serialize(value) {
      return value.getTime(); // value sent to the client
    },
    parseLiteral(ast) {
      if (ast.kind === Kind.INT) {
        return parseInt(ast.value, 10); // ast value is always in string format
      }
      return null;
    },
  }),
};

const bootcampResolvers = {
  bootcamp: asyncHandler((_, { id }) => {
    return await BootcampSchema.findById(id);
      // TODO: GraphQL Error Handling + Express middleware integration
    }),
  allBootcamps: asyncHandler(() => {
    return await BootcampSchema.find();
      // TODO: GraphQL Error Handling + Express middleware integration
  }),
  updateBootcamps: asyncHandler((_, args) => {
    return await BootcampSchema.findByIdAndUpdate({ id }, args, {
      new: true,
      runValidators: true
    });    
  }),
  createBootcamp: asyncHandler((_, args) => {
    // check for published bootcamp
    const bootcampExists = await BootcampSchema.exists({ name });

    if (!bootcampExists) {
      const bootcamp = await BootcampSchema.create(args);
      return bootcamp;
    }
      // TODO: GraphQL Error Handling + Express middleware integration
    return;
  }),
  deleteBootcamp: asyncHandler((_, { id }) => {
    return await BootcampSchema.deleteOne({ id });
      // TODO: GraphQL Error Handling + Express middleware integration
  }),
};

const resolvers = Object.assign({}, bootcampResolvers, resolverMap);

// 3
const server = new GraphQLServer({
  typeDefs: "./src/schema.graphql",
  resolvers,
});
server.start(() => console.log(`Server is running on http://localhost:4000`));
