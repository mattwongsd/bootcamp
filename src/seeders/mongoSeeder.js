const Bootcamp = require('../models/Bootcamp');
const { connectToMongoDB } = require('../utils/mongoHelper')
const faker = require('faker');
const _ = require('lodash');
const dotenv = require("dotenv").config();

const noOfBootcamps = 5;

const careers = [
  "Web Development",
  "Mobile Development",
  "Data Science",
  "UI/UX",
  "Product Management",
  "Digital Marketing",
  "Blockchain",
  "Others"
];

const newRandomBootcamp = () => {
  let bc = {};
  bc.name = faker.random.words();
  bc.description = faker.random.words();
  bc.slug = faker.helpers.slugify(bc.name);
  bc.website = faker.internet.url();
  bc.phone = faker.phone.phoneNumber();
  bc.email = faker.internet.email();
  bc.address = faker.address.streetAddress();
  bc.careers = _.sample(careers);
  // Max rating of 10
  bc.averageRating = faker.random.number({min: 1, max: 10});
  bc.photo = faker.image.image();
  bc.jobAssistance = faker.random.boolean();
  return new Bootcamp(bc);
}

const genBootcampSeedModels = () => {
  let bootcampsData = [];
  for (let i = 0; i < noOfBootcamps; i++) {
    bootcampsData = _.concat(bootcampsData, newRandomBootcamp());
  }
  return bootcampsData;
}



const importData = async (data) => {
  try {
    await Bootcamp.create(data);
    console.log('Bootcamp Data imported');
  } catch (err) {
    console.error(err)
  }
}

const main = async () => {  
  await connectToMongoDB(process.env.MONGO_CONNECTION_STRING);
  console.log("Generating boot camp seed data");
  const data = genBootcampSeedModels();
  console.log("Boot camp seed data generated!");
  console.log("Starting to import Seed data...");
  await importData(data);
  process.exit(0);
}

main();
