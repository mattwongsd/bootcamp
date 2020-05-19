const { gResolverAsyncHandler } = require("../utils/asyncHandlers");
const { getBootcampById, getAllBootcamps, createBootcamp, deleteBootcamp, updateBootcamp } = require("../services/bootcampService");

const bootcampResolvers = {
  Query: {
    bootcamp: (_, { id }) => getBootcampById(id),
    allBootcamps: () => getAllBootcamps()
  },
  Mutation: {
    updateBootcamp: (_, args) => updateBootcamp(args),
    createBootcamp: (_, args) => createBootcamp(args),
    deleteBootcamp: (_, { id }) => deleteBootcamp(id)
  }
};


module.exports = bootcampResolvers;