import mongoose, { Schema, models } from "mongoose";
// Define the schema for the wishlist
const wishlistSchema = new mongoose.Schema(
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
const Wishlist = models.Wishlist || mongoose.model("Wishlist", wishlistSchema);

export default Wishlist;
