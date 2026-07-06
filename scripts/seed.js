import connectDB from "../src/config/db.js";
import dotenv from "dotenv";
import Package from "../src/models/package.model.js";
import Destination from "../src/models/destination.model.js";
import Category from "../src/models/category.model.js";
import Country from "../src/models/country.model.js";
import Inquiry from "../src/models/inquiry.model.js";
import Testimonial from "../src/models/testimonial.model.js";
import UpcomingTrip from "../src/models/upcomingTrip.model.js";
import Footer from "../src/models/footerSetting.model.js";
import fs from "fs";
import path from "path";
import * as seededData from "../src/data/data.js";

const seedData = async () => {
  try {
    dotenv.config();
    await connectDB();
    // deleting old data
    await Package.deleteMany();

    await Category.deleteMany();

    await Destination.deleteMany();

    await Country.deleteMany();
    await Inquiry.deleteMany();
    await Testimonial.deleteMany();
    await UpcomingTrip.deleteMany();
    await Footer.deleteMany();
    console.log("Old data deleted");

    // Categories
    const formattedCategories = seededData.categories.map((category) => ({
      name: category,

      slug: category.toLowerCase().replace(/\s+/g, "-"),
    }));

    await Category.insertMany(formattedCategories);

    console.log("Categories Seeded");

    // destination
    const formattedDestinations = seededData.destinations.map(
      (destination) => ({
        title: destination.title,
        slug: destination.title
          .toLowerCase()
          .replace(/&/g, "and")
          .replace(/\s+/g, "-"),

        shortDescription: destination.description,

        description: destination.description,

        heroImage: destination.heroImage,
      }),
    );
    await Destination.insertMany(formattedDestinations);

    // fetch the destinations record's
    const destinations = await Destination.find();

    console.log("Destinations Seeded");

    // packages
    // Packages
    const packageFolder = path.join(process.cwd(), "src/data/packages");

    const packageFiles = fs
      .readdirSync(packageFolder)
      .filter((file) => file.endsWith(".json"));

    const packageData = packageFiles.map((file) => {
      const filePath = path.join(packageFolder, file);
      const fileContent = fs.readFileSync(filePath, "utf-8");

      return JSON.parse(fileContent);
    });

    const insertedPackages = await Package.insertMany(packageData);

    console.log(`${insertedPackages.length} Packages Seeded`);

    const packages = await Package.find();

    // countries
    await Country.insertMany(seededData.countriesData);
    console.log("Countries data is seeded");

    // Inquiris
    const formattedInquiries = seededData.inquiriesData.map(
      (inquiry, index) => ({
        ...inquiry,
        packageId: packages[index % packages.length]._id,
        destinationId: destinations[index % destinations.length]._id,
      }),
    );

    await Inquiry.insertMany(formattedInquiries);
    console.log("Inquiries seeded.");

    //testimonials
    const formattedTestimonials = seededData.testimonialsData.map(
      (testimonial, index) => ({
        ...testimonial,
        packageId: packages[index % packages.length]._id,
        destinationId: destinations[index % destinations.length]._id,
      }),
    );

    await Testimonial.insertMany(formattedTestimonials);

    console.log("Testimonials seeded");

    // upcomingTrip's
    const formattedUpcomingTrips = seededData.upcomingTripsData.map(
      (trip, index) => ({
        ...trip,
        packageId: packages[index % packages.length]._id,
      }),
    );

    await UpcomingTrip.insertMany(formattedUpcomingTrips);

    console.log("Upcoming trips seeded.");

    // footerSection
    await Footer.create(seededData.footerData);

    console.log("Footer seeded");

    process.exit(0);
  } catch (err) {
    console.log(err);

    process.exit(1);
  }
};

seedData();

// node scripts/seed.js
