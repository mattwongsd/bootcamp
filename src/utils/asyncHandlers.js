const errors = require("./errors");
const logger = require("./logger");
const { ApolloError } = require("apollo-errors");

exports.asyncHandler = (fn) => (req, res, next) =>
  Promise.resolve(fn(req, res, next)).catch(next);

exports.resolverAsyncHandler = (resolver) => async (...args) => {
  try {
    return await resolver(...args);
  } catch (err) {
    // Log the error and then return a generic internal server error
    logger.error(err);
    if (!(err instanceof ApolloError)) {
      const e = errors.InternalServerError();
      throw new e();
    }
    throw err;
  }
};