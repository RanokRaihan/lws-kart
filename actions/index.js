"use server";

import { auth, signIn, signOut } from "@/auth";
import { transformMongoArray } from "@/lib/mongoTransform";
import Cart from "@/models/cart.model";
import Category from "@/models/category.model";
import Order from "@/models/order.model";
import Product from "@/models/product.model";
import User from "@/models/user.model";
import Wishlist from "@/models/wishlist.model";
import RegisterSchema from "@/schema/signUpSchema";
import dbConnect from "@/services/dbConnect";
import { v2 as cloudinary } from "cloudinary";
import mongoose from "mongoose";
import { revalidatePath, revalidateTag } from "next/cache";

// configure cloudinary for image upload
cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function signInWithGoogle() {
  await signIn("google", {
    callbackUrl: `http://localhost:3000/`,
  });
}
export async function signInWithGithub() {
  await signIn("github", {
    callbackUrl: `http://localhost:3000/`,
  });
}
export async function signOutAction() {
  await signOut({ callbackUrl: "http://localhost:3000" });
}

export async function SignUpAction(prevState, formData) {
  const name = formData.get("name");
  const email = formData.get("email");
  const password = formData.get("password");
  const confirmPassword = formData.get("confirmPassword");
  const agreement = formData.get("agreement") === null ? false : true;

  try {
    //connect the database
    await dbConnect();
    //validat fields with zod
    const validatedFields = RegisterSchema.safeParse({
      name,
      email,
      password,
      confirmPassword,
      agreement,
    });

    if (!validatedFields.success) {
      return {
        ...prevState,
        error: validatedFields.error.flatten().fieldErrors,
        message: "User sign up failed",
      };
    }

    //check if the use email already exist
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return {
        ...prevState,
        error: {
          email: ["User with this email already exists"],
        },
        message: "User sign up failed",
      };
    }

    const newUser = await User.create({ name, email, password });
    // ckeck for safety
    const newUserRespone = await User.findById(newUser._id);
    if (!newUserRespone) {
      throw new Error("User creation failed!");
    }

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
      callbackUrl: "http://localhost:3000",
    });
    if (result.error) {
      throw new Error(result.error);
    }
    return { data: result };
  } catch (error) {
    return {
      error: {
        common: [error.message],
      },
    };
  }
}

export async function SignInWithCredentials(formData) {
  const email = formData.get("email");
  const password = formData.get("password");

  try {
    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
      callbackUrl: "http://localhost:3000",
    });
    if (result.error) {
      throw new Error(result.error);
    }
    return result;
  } catch (error) {
    throw new Error(error.message);
  }
}

//temp
export async function createCategory(formData) {
  try {
    const name = formData.get("name");
    const link = formData.get("link");
    const image = formData.get("image");
    const icon = formData.get("icon");
    const newCategory = await Category.create({ name, link, image, icon });
    return { message: "success" };
  } catch (error) {
    return { error: error.message };
  }
}

/*



*/

export async function updateUser(formData) {
  //data checker
  const isValidDate = (dateString) => {
    const date = new Date(dateString);
    return !isNaN(date.getTime()) ? date : undefined;
  };
  const { id, name, mobile, image, dob } = Object.fromEntries(formData);

  let imageLink = undefined;
  try {
    await dbConnect();
    if (image) {
      const arrayBuffer = await image.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);

      const imageRes = await new Promise((resolve, reject) => {
        cloudinary.uploader
          .upload_stream({}, function (error, result) {
            if (error) {
              reject(error);
              return;
            }
            resolve(result);
          })
          .end(buffer);
      });
      imageLink = imageRes?.url;
    }

    const updatedUser = await User.findByIdAndUpdate(id, {
      name,
      mobile,
      dob: isValidDate(dob),
      image: imageLink,
    })
      .select("-password")
      .lean();
    if (!updatedUser?._id) {
      throw new Error("user update failed");
    }
    revalidatePath("/account");
    return { success: true };
  } catch (error) {
    return { error: error.message };
  }
}

// update user address
export async function updateUserAddress(formData) {
  const { userId, type, ...rest } = formData;

  if (!userId) {
    throw new Error("can not update user address");
  }

  try {
    //connect the database first
    await dbConnect();
    if (type === "billing") {
      //update billing address
      const updatedUser = await User.findByIdAndUpdate(userId, {
        defaultBillingAddress: rest,
      })
        .select("-password")
        .lean();
      revalidatePath("/account", "page");
      return { success: true };
    } else {
      // update shipping address
      const updatedUser = await User.findByIdAndUpdate(userId, {
        defaultShippingAddress: rest,
      })
        .select("-password")
        .lean();
      revalidatePath("/account", "page");

      return { success: true };
    }
  } catch (error) {
    return { error: error.message };
  }
}

export async function getUserWishList() {
  revalidateTag("wishlist");
  try {
    await dbConnect();
    const session = await auth();
    if (!session?.user) {
      throw new Error("User not logged in");
    }
    const wishlist = await Wishlist.findOne({
      user: new mongoose.Types.ObjectId(
        session?.user?.id || session?.user?._id
      ),
    })
      .populate("items")
      .lean();
    if (!wishlist || wishlist?.items?.length === 0) {
      return [];
    }
    return { wishlistItems: transformMongoArray(wishlist?.items) };
  } catch (error) {
    return { error: error.message };
  }
}

// add or remove data from favourite
export async function toggleWishList(userId, productId) {
  try {
    //connect database
    await dbConnect();
    // Find the wishlist for the given user
    let wishlist = await Wishlist.findOne({ user: userId });

    // If no wishlist exists for the user, create one
    if (!wishlist) {
      wishlist = new Wishlist({ user: userId, items: [] });
    }

    // Check if the product is already in the wishlist
    const itemIndex = wishlist.items.indexOf(productId);

    if (itemIndex === -1) {
      // If the product is not in the wishlist, add it
      wishlist.items.push(productId);
    } else {
      // If the product is already in the wishlist, remove it
      wishlist.items.splice(itemIndex, 1);
    }

    // Save the updated wishlist
    await wishlist.save();
    revalidatePath("/[slug]/wishlist", "page");
    return JSON.stringify({
      success: true,
      task: itemIndex === -1 ? "add" : "remove",
      message:
        itemIndex === -1
          ? "Product added to wishlist"
          : "Product removed from wishlist",
      wishlist,
    });
  } catch (error) {
    return JSON.stringify({
      success: false,
      message: "An error occurred while toggling the wishlist",
      error: error.message,
    });
  }
}

//add product to  cart

export async function addProductToCart(productId, quantity = 1) {
  try {
    await dbConnect();
    const session = await auth();
    if (!session?.user) {
      throw new Error("User not authenticated");
    }

    const userId = session.user.id || session?.user?._id;

    // Find the user's cart or create a new one
    let cart = await Cart.findOne({ user: userId }).populate("items.product");

    if (!cart) {
      cart = new Cart({ user: userId, items: [] });
    }

    // Find the product to add
    const product = await Product.findById(productId);
    if (!product) {
      throw new Error("Product not found");
    }

    // Check if the product is already in the cart
    const cartItem = cart.items.find((item) =>
      item.product._id.equals(productId)
    );
    if (cartItem) {
      //throw an error
      throw new Error("Item already in the cart");
    } else {
      // Add new product to the cart
      cart.items.push({ product: productId, quantity });
    }

    // Save the cart
    await cart.save();
    revalidatePath("/[slug]/cart", "page");
    return JSON.stringify({ success: true, message: "Product added to cart" });
  } catch (error) {
    return JSON.stringify({ success: false, error: error.message });
  }
}

// delete product from cart

export async function removeProductFromCart(productId) {
  try {
    await dbConnect();
    const session = await auth();
    if (!session?.user) {
      throw new Error("User not authenticated");
    }

    const userId = session.user.id || session?.user?._id;

    // Find the user's cart
    let cart = await Cart.findOne({ user: userId }).populate("items.product");

    if (!cart) {
      throw new Error("Cart not found");
    }

    // Find the product index in the cart
    const itemIndex = cart.items.findIndex((item) =>
      item.product._id.equals(productId)
    );

    if (itemIndex === -1) {
      throw new Error("Product not found in cart");
    }

    // Remove the item from the cart
    cart.items.splice(itemIndex, 1);

    // Save the updated cart
    await cart.save();
    revalidatePath("/[slug]/cart", "page");
    return JSON.stringify({ success: true, message: "item removed from cart" });
  } catch (error) {
    return JSON.stringify({ success: false, error: error.message });
  }
}

// clear the cart

export async function clearCart() {
  await dbConnect();
  try {
    const session = await auth();
    if (!session?.user) {
      throw new Error("User not authenticated");
    }

    const userId = session.user.id || session?.user?._id;

    // Find the user's cart
    let cart = await Cart.findOne({ user: userId });

    if (!cart) {
      throw new Error("Cart not found");
    }

    // Clear all items from the cart
    cart.items = [];

    // Save the updated cart
    await cart.save();

    // Return the updated cart object as a JSON string
    return JSON.stringify({ success: true, cart });
  } catch (error) {
    // Return the error object as a JSON string
    return JSON.stringify({ success: false, error: error.message });
  }
}

//get all the item in cart

export async function getCartItems() {
  try {
    const session = await auth();
    if (!session?.user) {
      throw new Error("User not authenticated");
    }

    const userId = session.user.id;

    // Find the user's cart
    let cart = await Cart.findOne({ user: userId })
      .populate("items.product")
      .lean();

    if (!cart) {
      // If cart not found, create a new one
      cart = new Cart({ user: userId, items: [] });
      await cart.save();
      return JSON.stringify({ success: true, items: [] });
    }

    // Return the cart items as a JSON string
    return JSON.stringify({
      success: true,
      items: transformMongoArray(cart.items),
    });
  } catch (error) {
    // Return the error object as a JSON string
    return JSON.stringify({ success: false, error: error.message });
  }
}

//place a order
export async function placeOrder(address) {
  try {
    const session = await auth();
    if (!session?.user) {
      throw new Error("User not authenticated!");
    }

    await dbConnect();

    // Find the user's cart
    const userId = session.user.id || session?.user?._id;
    const cart = await Cart.findOne({ user: userId }).populate("items.product");

    if (!cart || cart.items.length === 0) {
      throw new Error("Cart is empty");
    }

    // Calculate the total amount
    const totalAmount = cart.items.reduce((total, cartItem) => {
      const { price, discount } = cartItem.product;
      const discountAmount = (price * discount) / 100;
      const discountedPrice = price - discountAmount;
      const totalItemPrice = discountedPrice * cartItem.quantity;
      return total + totalItemPrice;
    }, 0);

    // Create a new order
    const newOrder = new Order({
      user: userId,
      products: cart.items.map((item) => ({
        product: item.product._id,
        quantity: item.quantity,
      })),
      totalAmount: totalAmount,
      status: "Pending",
      paymentMethod: "COD", // or whatever method you prefer
      shippingAddress: address,
      billingAddress: address,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    await newOrder.save();

    // Clear the user's cart
    cart.items = [];
    await cart.save();

    return JSON.stringify({
      success: true,
      message: "order placed",
      order: newOrder?._id,
    });
  } catch (error) {
    return JSON.stringify({ success: false, error: error.message });
  }
}
