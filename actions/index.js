"use server";

import { signIn, signOut } from "@/auth";
import Category from "@/models/category.model";
import User from "@/models/user.model";
import RegisterSchema from "@/schema/signUpSchema";
import dbConnect from "@/services/dbConnect";
import { v2 as cloudinary } from "cloudinary";
import { revalidatePath } from "next/cache";

// configure cloudinary for image upload
cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function signInWithGoogle() {
  await signIn("google", { callbackUrl: "http://localhost:3000" });
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
    return {
      data: {
        name: newUserRespone?.name,
        email: newUserRespone?.email,
        image: newUserRespone?.image,
      },
      message: "User created successfuly",
    };
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
      dob,
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
    console.log(error);
    return { error: error.message };
  }
}
