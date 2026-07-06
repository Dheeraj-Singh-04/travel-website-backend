import mongoose from "mongoose";

// Itinerary Schema
const itinerarySchema = new mongoose.Schema(
  {
    day: Number,
    title: String,
    description: String,
  },
  { _id: false },
);

// FAQ Schema
const faqSchema = new mongoose.Schema(
  {
    question: String,
    answer: String,
  },
  { _id: false },
);

// Hotel Schema
const hotelSchema = new mongoose.Schema(
  {
    name: String,
    location: String,
    category: String,
  },
  { _id: false },
);

// Pricing Tier Schema
const pricingTierSchema = new mongoose.Schema(
  {
    title: String,
    price: String,
    description: String,
  },
  { _id: false },
);

// Batch Schema
const batchSchema = new mongoose.Schema(
  {
    departureDate: String,
    returnDate: String,
    price: String,
    seatsAvailable: Number,
    status: String,
  },
  { _id: false },
);

// Payment Schedule Schema
const paymentScheduleSchema = new mongoose.Schema(
  {
    title: String,
    amount: String,
  },
  { _id: false },
);

// Package Schema
const packageSchema = new mongoose.Schema(
  {
    slug: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    title: {
      type: String,
      required: true,
      trim: true,
    },

    category: {
      type: String,
      required: true,
    },

    subCategory: [
      {
        type: String,
      },
    ],

    status: {
      type: String,
      enum: ["draft", "active", "inactive"],
      default: "draft",
    },

    is_featured: {
      type: Boolean,
      default: false,
    },

    sort_order: {
      type: Number,
      default: 0,
    },

    main_image_url: String,

    video_url: String,

    image_urls: [String],

    price_num: {
      type: Number,
      default: 0,
    },

    destination_slugs: [String],

    data: {
      duration: String,

      destinations: String,

      tripType: String,

      departureCities: String,

      groupSize: String,

      bestSeason: String,

      country: String,

      hotelCategory: String,

      flights: String,

      visa: String,

      mealsIncluded: String,

      transfers: String,

      price: String,

      mrp: String,

      discountText: String,

      depositToBook: String,

      rating: String,

      reviews: String,

      description: String,

      about: String,

      whyBook: String,

      highlights: [String],

      itinerary: [itinerarySchema],

      hotels: [hotelSchema],

      inclusions: [String],

      exclusions: [String],

      pricingTiersList: [pricingTierSchema],

      batches: [batchSchema],

      paymentSchedule: [paymentScheduleSchema],

      cancellationPolicy: [String],

      amendments: [String],

      forceMajeure: [String],

      whatToPack: [String],

      faqs: [faqSchema],

      trustSignals: [String],

      seoTitle: String,

      seoDescription: String,

      aeoSnippet: String,
    },
  },
  {
    timestamps: true,
  },
);

// Indexes
packageSchema.index({ slug: 1 });

packageSchema.index({ category: 1 });

packageSchema.index({ price_num: 1 });

packageSchema.index({ status: 1 });

packageSchema.index({ is_featured: 1 });

packageSchema.index({ destination_slugs: 1 });

const Package = mongoose.model("Package", packageSchema);

export default Package;