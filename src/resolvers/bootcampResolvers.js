const { resolverAsyncHandler } = require("../utils/asyncHandlers");
const { getBootcampById, getAllBootcamps, createBootcamp, deleteBootcamp, updateBootcamp } = require("../services/bootcampService");

const bootcampResolvers = {
  Query: {
    bootcamp: resolverAsyncHandler((_, { id }) => getBootcampById(id)),
    allBootcamps: resolverAsyncHandler(() => getAllBootcamps())
  },
  Mutation: {
    updateBootcamp: resolverAsyncHandler((_, args) => updateBootcamp(args)),
    createBootcamp: resolverAsyncHandler((_, args) => createBootcamp(args)),
    deleteBootcamp: resolverAsyncHandler((_, { id }) => deleteBootcamp(id))
  }
};


module.exports = bootcampResolvers;