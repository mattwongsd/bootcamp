const BootcampSchema = require("../models/Bootcamp");

exports.getBootcampById = async (id) => {
  return await BootcampSchema.findById(id);
}

exports.getAllBootcamps = async () => {
  return await BootcampSchema.find();
}

exports.updateBootcamp = async ({input}) => {
  return await BootcampSchema.findByIdAndUpdate(input.id, input, {
    new: true,
    runValidators: true
  });    
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
  return await BootcampSchema.findByIdAndDelete(id);
}