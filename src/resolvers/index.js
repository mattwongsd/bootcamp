const bootcampResolvers = require("./bootcampResolvers");
const customScalarTypes = require("./customScalarTypes");

const resolvers = Object.assign({},
  bootcampResolvers,
  customScalarTypes
);

module.exports = resolvers;