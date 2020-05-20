const BootcampSchema = require("../models/Bootcamp");
const errors = require("../utils/errors");

exports.getBootcampById = async (id) => {
  const result = await BootcampSchema.findById(id);
  if (!result) {
    const err = errors.BootcampNotFoundError(id);
    throw new err();
  }
  return result;
}

exports.getAllBootcamps = async () => {
  return await BootcampSchema.find();
}

exports.updateBootcamp = async ({ input, input: { id } }) => {
  const result = await BootcampSchema.findByIdAndUpdate(id, input, {
    new: true,
    runValidators: true
  });
  if (!result) {
    const err = errors.BootcampNotFoundError(id);
    throw new err();
  }
  return result;
}

exports.createBootcamp = async ({input}) => {
  const bootcampExists = await BootcampSchema.exists({name: input.name});
  if (!bootcampExists) {
    const bootcamp = await BootcampSchema.create(input);
    return bootcamp;
  }
  return;
}

exports.deleteBootcamp = async (id) => {
  const result = await BootcampSchema.findByIdAndDelete(id);
  if (!result) {
    const err = errors.BootcampNotFoundError(id);
    throw new err();
  }
  return result;
}