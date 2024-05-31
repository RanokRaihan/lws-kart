const mongoose = require("mongoose");
const { Schema } = mongoose;

// Define the schema for the wishlist
const WishlistSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    items: [
      {
        type: Schema.Types.ObjectId,
        ref: "Product",
      },
    ],
  },
  {
    timestamps: true,
  }
);

// Create the Wishlist model from the schema
const Wishlist =
  mongoose.models.Wishlist || mongoose.model("Wishlist", WishlistSchema);

module.exports = Wishlist;
