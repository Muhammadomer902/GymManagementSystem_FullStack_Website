import mongoose from "mongoose";

const supplementSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide a name for the supplement"],
    trim: true,
  },
  brand: {
    type: String,
    required: [true, "Please provide a brand name"],
    trim: true,
  },
  description: {
    type: String,
    required: [true, "Please provide a description"],
  },
  detailedDescription: {
    type: String,
    required: [true, "Please provide a detailed description"],
  },
  price: {
    type: Number,
    required: [true, "Please provide a price"],
    min: [0, "Price cannot be negative"],
  },
  discount: {
    type: Number,
    default: 0,
    min: [0, "Discount cannot be negative"],
    max: [100, "Discount cannot be more than 100%"],
  },
  images: [
    {
      type: String,
      required: [true, "Please provide at least one image"],
    },
  ],
  category: {
    type: String,
    required: [true, "Please provide a category"],
    enum: [
      "Protein",
      "Pre-Workout",
      "Post-Workout",
      "Vitamins",
      "Amino Acids",
      "Fat Burners",
      "Other",
    ],
  },
  ingredients: [
    {
      name: String,
      amount: String,
    },
  ],
  servingSize: {
    type: String,
    required: [true, "Please provide serving size information"],
  },
  servingsPerContainer: {
    type: Number,
    required: [true, "Please provide number of servings per container"],
  },
  nutritionalInfo: {
    calories: Number,
    protein: Number,
    carbs: Number,
    fat: Number,
    sugar: Number,
    sodium: Number,
  },
  benefits: [
    {
      type: String,
    },
  ],
  usageInstructions: {
    type: String,
    required: [true, "Please provide usage instructions"],
  },
  warnings: {
    type: String,
  },
  stock: {
    type: Number,
    required: [true, "Please provide stock quantity"],
    min: [0, "Stock cannot be negative"],
  },
  rating: {
    type: Number,
    default: 0,
    min: [0, "Rating cannot be negative"],
    max: [5, "Rating cannot be more than 5"],
  },
  reviews: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
      rating: {
        type: Number,
        required: true,
        min: 1,
        max: 5,
      },
      comment: String,
      date: {
        type: Date,
        default: Date.now,
      },
    },
  ],
  isFeatured: {
    type: Boolean,
    default: false,
  },
  isAvailable: {
    type: Boolean,
    default: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// Update the updatedAt field before saving
supplementSchema.pre("save", function (next) {
  this.updatedAt = new Date();
  next();
});

// Create and export the model
const Supplement =
  mongoose.models.Supplement || mongoose.model("Supplement", supplementSchema);

export default Supplement;
