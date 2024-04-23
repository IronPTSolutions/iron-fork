const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const categories = require("../data/categories.json");

const restaurantSchema = new Schema(
  {
    name: {
      type: String,
      required: "Name is required",
    },
    coverUrl: {
      type: String,
      required: 'Cover image url is required',
      validate: {
        validator: function (url) {
          try {
            new URL(url);
            return true;
          } catch (error) {
            return false;
          }
        },
        message: 'Invalid cover image url'
      }
    },
    category: {
      type: String,
      enum: categories,
      required: "Category is required",
    },
    tables: {
      type: Number,
      min: [1, "Minimum number of tables are 1"],
      max: [100, "Maximum number of tables are 100"],
      required: "Amount of tables are required",
    },
    avgPrice: Number,
    address: {
      type: String,
      required: "Address is required",
    },
    location: {
      type: {
        type: String,
        enum: ["Point"],
        required: true,
      },
      coordinates: {
        type: [Number],
        required: true,
      },
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
      transform: (doc, ret) => {
        ret.id = ret._id;
        ret.location = ret.location.coordinates.reverse();
        delete ret._id;
        delete ret.__v;
        return ret;
      },
    },
  }
);

restaurantSchema.virtual("comments", {
  ref: "Comment",
  localField: "_id",
  foreignField: "restaurant",
  justOne: false,
});

restaurantSchema.index({ location: "2dsphere" });

const Restaurant = mongoose.model("Restaurant", restaurantSchema);
module.exports = Restaurant;
