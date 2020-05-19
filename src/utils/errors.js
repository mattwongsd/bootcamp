const { createError } = require("apollo-errors");

const BootcampNotFoundError = id => {
  const err = createError("BootcampNotFoundError", {
    message: `Bootcamp with id: ${id} was not found.`
  });

  Error.captureStackTrace(err, BootcampNotFoundError);
  return err;
}

const InternalServerError = () => {
  const err = createError("InternalServerError", {
    message: `Internal server error.`
  });
  Error.captureStackTrace(err, InternalServerError);
  return err;
}

module.exports = {
  BootcampNotFoundError,
  InternalServerError
};