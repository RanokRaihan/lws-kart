"use client";

import { updateUser } from "@/actions";
import { updateUserSchema } from "@/schema/updateUserSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import Loader from "../ui/Loader";

const EditAccountForm = ({ userInfo }) => {
  const { name, mobile, dob, _id } = userInfo || {};
  const [serverError, setServerError] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();
  useEffect(() => {
    if (serverError) {
      toast.error(serverError);
    }

    if (isSuccess) {
      // revalidatePath("/account", "page");
      toast.success("address updated successfully");
      router.push("/account");
    }
  }, [isSuccess, router, serverError]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm({
    defaultValues: { name, mobile, dob: new Date(dob).toLocaleDateString() },
    resolver: zodResolver(updateUserSchema),
  });

  console.log(isLoading);
  useEffect(() => {
    register("image"); // Manually register the image input
  }, [register]);

  // submit the form
  const onSubmit = async (data) => {
    setIsLoading(true);
    const { name, mobile, image, dob } = data;
    const formData = new FormData();
    formData.append("id", _id?.toString());
    name && formData.append("name", name);
    image && formData.append("image", image);
    dob && formData.append("dob", dob);
    mobile && formData.append("mobile", mobile);

    const response = await updateUser(formData);
    setIsLoading(false);
    if (response?.error) {
      setServerError(response.error);
    }
    if (response?.success) {
      setIsSuccess(true);
    }
  };

  const handleImageChange = (e) => {
    setValue("image", e.target.files[0]);
  };

  const selectedImage = watch("image");

  return (
    <form
      className="max-w-md mx-auto p-4 bg-white shadow-md rounded"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="name"
        >
          Name
        </label>
        <input
          type="text"
          {...register("name")}
          className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
            errors.name && "border-red-500"
          }`}
        />
        {errors.name && (
          <p className="text-red-500 text-xs italic">{errors.name.message}</p>
        )}
      </div>

      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="mobile"
        >
          Mobile
        </label>
        <input
          type="text"
          {...register("mobile")}
          className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
            errors.mobile && "border-red-500"
          }`}
        />
        {errors.mobile && (
          <p className="text-red-500 text-xs italic">{errors.mobile.message}</p>
        )}
      </div>

      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="image"
        >
          Image
        </label>
        <input
          type="file"
          onChange={handleImageChange}
          className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
            errors.image && "border-red-500"
          }`}
        />
        {selectedImage && (
          <p className="text-gray-700 text-sm italic mt-2">
            Selected file: {selectedImage.name}
          </p>
        )}
        {errors.image && (
          <p className="text-red-500 text-xs italic">{errors.image.message}</p>
        )}
      </div>

      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="dob"
        >
          Date of Birth
        </label>
        <input
          type="date"
          {...register("dob")}
          className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
            errors.dob && "border-red-500"
          }`}
        />
        {errors.dob && (
          <p className="text-red-500 text-xs italic">{errors.dob.message}</p>
        )}
      </div>

      <div className="flex items-center justify-between">
        <button
          type="submit"
          disabled={isLoading}
          className="bg-blue-500 w-full hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline relative"
        >
          {isLoading ? (
            <Loader />
          ) : (
            <span className={isLoading ? "opacity-0" : "opacity-100"}>
              Update
            </span>
          )}
        </button>
      </div>
    </form>
  );
};

export default EditAccountForm;
