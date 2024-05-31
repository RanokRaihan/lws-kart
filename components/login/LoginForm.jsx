"use client";

import { SignInWithCredentials } from "@/actions";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

const LoginForm = () => {
  const [error, setError] = useState(null);
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect_to = searchParams.get("redirect_to");

  //form submit handler
  const handleSubmit = async (event) => {
    event.preventDefault();
    // create new formData from login form
    const formData = new FormData(event.currentTarget);

    try {
      const res = await SignInWithCredentials(formData);
      if (!res.error) {
        if (redirect_to) {
          router.push(redirect_to);
        } else {
          router.push("/");
        }
      }
    } catch (error) {
      setError(error.message);
    }
  };
  return (
    <form autoComplete="off" onSubmit={handleSubmit}>
      <div className="space-y-2">
        <div>
          <label htmlFor="email" className="text-gray-600 mb-2 block">
            <span className="text-red-500" aria-hidden={true}>
              *
            </span>{" "}
            Email address
          </label>
          <input
            type="email"
            name="email"
            id="email"
            className="block w-full border border-gray-300 px-4 py-3 text-gray-600 text-sm rounded focus:ring-0 focus:border-primary placeholder-gray-400"
            placeholder="youremail.@domain.com"
            required
            aria-required={true}
          />
        </div>
        <div>
          <label htmlFor="password" className="text-gray-600 mb-2 block">
            <span className="text-red-500" aria-hidden={true}>
              *
            </span>{" "}
            Password
          </label>
          <input
            type="password"
            name="password"
            id="password"
            className="block w-full border border-gray-300 px-4 py-3 text-gray-600 text-sm rounded focus:ring-0 focus:border-primary placeholder-gray-400"
            placeholder="*******"
            required
            aria-required={true}
          />
        </div>
      </div>

      <div>
        {error && <span className="text-sm text-red-500 ml-2">{error}</span>}
      </div>

      <div className="flex items-center justify-between mt-6">
        <div className="flex items-center">
          <input
            type="checkbox"
            name="remember"
            id="remember"
            className="text-primary focus:ring-0 rounded-sm cursor-pointer"
          />
          <label
            htmlFor="remember"
            className="text-gray-600 ml-3 cursor-pointer"
          >
            Remember me
          </label>
        </div>
        <a href="#" className="text-primary">
          Forgot password
        </a>
      </div>
      <div className="mt-4">
        <button
          type="submit"
          className="block w-full py-2 text-center text-white bg-primary border border-primary rounded hover:bg-transparent hover:text-primary transition uppercase font-roboto font-medium"
        >
          Login
        </button>
      </div>
    </form>
  );
};

export default LoginForm;
