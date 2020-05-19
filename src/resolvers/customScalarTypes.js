const { GraphQLScalarType } = require("graphql");

const customScalarTypes = {
  DateTime: new GraphQLScalarType({
    name: "DateTime",
    description: "A date and time, represented as an ISO-8601 string",
    parseValue: value => value.toISOString(), // value from the client
    serialize: value => new Date(value), // value sent to the client
    parseLiteral: ast => new Date(ast.value)
  }),
};

module.exports = customScalarTypes;