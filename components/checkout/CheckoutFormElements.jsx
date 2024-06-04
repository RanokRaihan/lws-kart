"use client";
import { placeOrder } from "@/actions";
import addressFormSchema from "@/schema/addressSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

const CheckoutFormElements = ({ address }) => {
  console.log({ address });
  const [serverError, setServerError] = useState("");
  const router = useRouter();

  //get the default address
  const {
    firstName,
    lastName,
    email,
    address1,
    address2,
    city,
    country,
    postalCode,
    mobile,
  } = address || {};

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(addressFormSchema),
    defaultValues: {
      firstName,
      lastName,
      email,
      address1,
      address2,
      city,
      country,
      postalCode,
      mobile,
    },
  });
  //submit form
  const onSubmit = async (data) => {
    const {
      firstName,
      lastName,
      email,
      address1,
      address2,
      city,
      country,
      postalCode,
      mobile,
    } = data;
    const response = await placeOrder({
      firstName,
      lastName,
      email,
      address1,
      address2,
      city,
      country,
      postalCode,
      mobile,
    });

    const result = JSON.parse(response);
    if (result?.success) {
      toast.success(result.message);
      router.push("/success");
    }
    if (result && !result?.success) {
      toast?.error(result?.error);
    }
  };
  return (
    <form
      id="updateAddressForm"
      className="space-y-4"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div>
        <label
          htmlFor="firstName"
          className="block text-sm font-medium text-gray-700"
        >
          First Name
        </label>
        <input
          type="text"
          id="firstName"
          {...register("firstName")}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
        />
        {errors.firstName && (
          <p className="text-red-500 text-sm mt-1">
            {errors.firstName.message}
          </p>
        )}
      </div>

      <div>
        <label
          htmlFor="lastName"
          className="block text-sm font-medium text-gray-700"
        >
          Last Name
        </label>
        <input
          type="text"
          id="lastName"
          {...register("lastName")}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
        />
        {errors.lastName && (
          <p className="text-red-500 text-sm mt-1">{errors.lastName.message}</p>
        )}
      </div>

      <div>
        <label
          htmlFor="email"
          className="block text-sm font-medium text-gray-700"
        >
          Email
        </label>
        <input
          type="email"
          id="email"
          {...register("email")}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
        />
        {errors.email && (
          <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
        )}
      </div>

      <div>
        <label
          htmlFor="address1"
          className="block text-sm font-medium text-gray-700"
        >
          Address line 1
        </label>
        <input
          type="text"
          id="address1"
          {...register("address1")}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
        />
        {errors.address1 && (
          <p className="text-red-500 text-sm mt-1">{errors.address1.message}</p>
        )}
      </div>

      <div>
        <label
          htmlFor="address2"
          className="block text-sm font-medium text-gray-700"
        >
          Address line 2
        </label>
        <input
          type="text"
          id="address2"
          {...register("address2")}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          placeholder="optional"
        />
        {errors.address2 && (
          <p className="text-red-500 text-sm mt-1">{errors.address2.message}</p>
        )}
      </div>

      <div>
        <label
          htmlFor="city"
          className="block text-sm font-medium text-gray-700"
        >
          City
        </label>
        <input
          type="text"
          id="city"
          {...register("city")}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
        />
        {errors.city && (
          <p className="text-red-500 text-sm mt-1">{errors.city.message}</p>
        )}
      </div>

      <div>
        <label
          htmlFor="country"
          className="block text-sm font-medium text-gray-700"
        >
          Country
        </label>
        <input
          type="text"
          id="country"
          {...register("country")}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
        />
        {errors.country && (
          <p className="text-red-500 text-sm mt-1">{errors.country.message}</p>
        )}
      </div>

      <div>
        <label
          htmlFor="postalCode"
          className="block text-sm font-medium text-gray-700"
        >
          Postal Code
        </label>
        <input
          type="text"
          id="postalCode"
          {...register("postalCode")}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
        />
        {errors.postalCode && (
          <p className="text-red-500 text-sm mt-1">
            {errors.postalCode.message}
          </p>
        )}
      </div>

      <div>
        <label
          htmlFor="mobile"
          className="block text-sm font-medium text-gray-700"
        >
          Mobile
        </label>
        <input
          type="text"
          id="mobile"
          {...register("mobile")}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
        />
        {errors.mobile && (
          <p className="text-red-500 text-sm mt-1">{errors.mobile.message}</p>
        )}
      </div>
      <div className="flex items-center mb-4 mt-2">
        <input
          required
          aria-required={true}
          type="checkbox"
          name="aggrement"
          id="aggrement"
          className="text-primary focus:ring-0 rounded-sm cursor-pointer w-3 h-3"
        />
        <label
          htmlFor="aggrement"
          className="text-gray-600 ml-3 cursor-pointer text-sm"
        >
          I agree to the
          <Link href="#" className="text-primary">
            terms &amp; conditions
          </Link>
        </label>
      </div>
      <div className="flex justify-end">
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-md shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Place order
        </button>
      </div>
    </form>
  );
};

export default CheckoutFormElements;
