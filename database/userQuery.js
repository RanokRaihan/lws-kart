import { transformedObject } from "@/lib/mongoTransform";
import User from "@/models/user.model";
import dbConnect from "@/services/dbConnect";
import mongoose from "mongoose";

export async function getUserInfo(id) {
  try {
    await dbConnect();
    const user = await User.findById(new mongoose.Types.ObjectId(id))
      .select("-password")
      .lean();
    if (!user) {
      throw new Error(" user found");
    }
    return { userInfo: transformedObject(user) };
  } catch (error) {
    return { error: error.message };
  }
}
