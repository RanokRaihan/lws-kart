import { auth } from "@/auth";
import { transformMongoArray } from "@/lib/mongoTransform";
import Category from "@/models/category.model";
import Product from "@/models/product.model";
import dbConnect from "@/services/dbConnect";
import mongoose from "mongoose";

export async function getAllProduct() {
  try {
    await dbConnect();
    const products = await Product.find().populate("category").lean();
    return { data: products };
  } catch (error) {
    return {
      error: error.message,
    };
  }
}
export async function getSingleProduct(id) {
  try {
    await dbConnect();
    const product = await Product.findById(id).populate("category").lean();
    return { data: product };
  } catch (error) {
    return {
      error: error.message,
    };
  }
}

export async function getRelatedProducts(productId) {
  try {
    //connect the database
    await dbConnect();
    // Find the product by its ID

    const product = await Product.findById(productId);

    if (!product) {
      throw new Error("Product not found");
    }

    // Find other products in the same category, excluding the original product, limit to 4
    const relatedProducts = await Product.find({
      category: product.category,
      _id: { $ne: productId },
    })
      .limit(4)
      .lean();

    return transformMongoArray(relatedProducts);
  } catch (error) {
    console.error("Error fetching related products:", error);
    return {
      error: error.message,
    };
  }
}

//get all category
export async function getAllCategory() {
  try {
    await dbConnect();
    const categories = await Category.aggregate([
      {
        $lookup: {
          from: "products",
          localField: "_id",
          foreignField: "category",
          as: "products",
        },
      },
      {
        $project: {
          name: 1,
          link: 1,
          icon: 1,
          image: 1,
          productCount: { $size: "$products" },
        },
      },
    ]);

    return transformMongoArray(categories);
  } catch (error) {
    return { error: error.message };
  }
}

//query products

// export async function getProducts(queryParams) {
//   const { category, minprice, maxprice, size, search } = queryParams || {};

//   // Initialize an empty query object
//   let query = {};

//   // Filter by category (multiple categories separated by a plus sign)
//   if (category) {
//     const categories = category.split(" ");
//     query.category = {
//       $in: categories.map((cat) => new mongoose.Types.ObjectId(cat)),
//     };
//   }

//   // Filter by price range
//   if (minprice || maxprice) {
//     query.price = {};
//     if (minprice && parseFloat(minprice) !== NaN) {
//       query.price.$gte = parseFloat(minprice);
//     }

//     if (maxprice && parseFloat(maxprice) !== NaN) {
//       query.price.$lte = parseFloat(maxprice);
//     }
//   }

//   // Filter by size (case-insensitive)
//   if (size) {
//     query.availableSize = {
//       $elemMatch: { $regex: new RegExp(`^${size}$`, "i") },
//     };
//   }

//   // Search by product name or description
//   if (search) {
//     const searchRegex = new RegExp(search, "i");
//     query.$or = [{ name: searchRegex }, { description: searchRegex }];
//   }

//   try {
//     //connect the database
//     await dbConnect();
//     // Execute the query
//     const products = await Product.find(query).populate("category").lean();

//     return { data: products };
//   } catch (err) {
//     return { error: err.message };
//   }
// }

//get products

export async function getProducts(queryParams) {
  const session = await auth();

  const { category, minprice, maxprice, size, search } = queryParams || {};

  // Initialize the aggregation pipeline
  let pipeline = [];

  // Filter by category (multiple categories separated by a plus sign)
  if (category) {
    const categories = category.split(" ");
    pipeline.push({
      $match: {
        category: {
          $in: categories.map((cat) => new mongoose.Types.ObjectId(cat)),
        },
      },
    });
  }

  // Calculate the discounted price and add it to the documents
  pipeline.push({
    $addFields: {
      discountedPrice: {
        $multiply: [
          "$price",
          { $subtract: [1, { $divide: ["$discount", 100] }] },
        ],
      },
    },
  });

  // Filter by price range based on discounted price
  if (minprice || maxprice) {
    let priceFilter = {};
    if (minprice && !isNaN(parseFloat(minprice))) {
      priceFilter.$gte = parseFloat(minprice);
    }

    if (maxprice && !isNaN(parseFloat(maxprice))) {
      priceFilter.$lte = parseFloat(maxprice);
    }

    pipeline.push({
      $match: {
        discountedPrice: priceFilter,
      },
    });
  }

  // Filter by size (case-insensitive)
  if (size) {
    pipeline.push({
      $match: {
        availableSize: {
          $elemMatch: { $regex: new RegExp(`^${size}$`, "i") },
        },
      },
    });
  }

  // Search by product name or description
  if (search) {
    const searchRegex = new RegExp(search, "i");
    pipeline.push({
      $match: {
        $or: [{ name: searchRegex }, { description: searchRegex }],
      },
    });
  }

  try {
    // Connect to the database
    await dbConnect();

    // Execute the aggregation pipeline
    const products = await Product.aggregate(pipeline).exec();

    // Populate the category field
    const productsWithCategory = await Product.populate(products, {
      path: "category",
    });

    return { data: transformMongoArray(productsWithCategory) };
  } catch (err) {
    return { error: err.message };
  }
}

//get new araival poduct for 30 days
export async function getNewArrivals() {
  try {
    //connect db first
    await dbConnect();
    // Query to find products created within the last 30 days
    const newArrivals = await Product.find()
      .sort({ createdAt: -1 })
      .limit(4)
      .populate("category")
      .lean();
    return { data: transformMongoArray(newArrivals) };
  } catch (err) {
    console.error("Error fetching new arrivals:", err);
    return { error: err.message };
  }
}

//get trending products
export async function getTrendingProducts() {
  try {
    //connect db first
    await dbConnect();
    // Query to find products created within the last 30 days
    const trendingProduct = await Product.find()
      .sort({ ratedUser: -1 })
      .limit(8)
      .populate("category")
      .lean();
    return { data: transformMongoArray(trendingProduct) };
  } catch (err) {
    console.error("Error fetching trending:", err);
    return { error: err.message };
  }
}
