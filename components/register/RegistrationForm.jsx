"use client";
import { SignUpAction } from "@/actions";
import Link from "next/link";
import { useFormState } from "react-dom";
const initailState = {
  data: null,
  error: null,
};
const RegistrationForm = () => {
  const [state, formAction] = useFormState(SignUpAction, initailState);

  return (
    <form action={formAction} autoComplete="off">
      <div className="space-y-2">
        <div>
          <label htmlFor="name" className="text-gray-600 mb-2 block">
            <span className="text-red-500 " aria-hidden={true}>
              *
            </span>
            Full Name
          </label>
          <input
            type="text"
            name="name"
            id="name"
            className={`block w-full border ${
              state?.error?.name ? "border-red-500" : "border-gray-300"
            }  px-4 py-3 text-gray-600 text-sm rounded  placeholder-gray-400`}
            placeholder="Ex: Jayed Khan"
          />
          {state?.error?.name && (
            <span id="nameError" className="text-sm text-red-500 ml-2">
              {state?.error?.name?.[0]}
            </span>
          )}
        </div>
        <div>
          <label htmlFor="email" className="text-gray-600 mb-2 block">
            <span className="text-red-500 " aria-hidden={true}>
              *
            </span>
            Email address
          </label>
          <input
            type="email"
            name="email"
            id="email"
            className={`block w-full border ${
              state?.error?.email ? "border-red-500" : "border-gray-300"
            }  px-4 py-3 text-gray-600 text-sm rounded  placeholder-gray-400`}
            placeholder="youremail.@domain.com"
          />
          {state?.error?.email && (
            <span id="nameError" className="text-sm text-red-500 ml-2">
              {state?.error?.email?.[0]}
            </span>
          )}
        </div>
        <div>
          <label htmlFor="password" className="text-gray-600 mb-2 block">
            <span className="text-red-500 " aria-hidden={true}>
              *
            </span>
            Password
          </label>
          <input
            type="password"
            name="password"
            id="password"
            className={`block w-full border ${
              state?.error?.password ? "border-red-500" : "border-gray-300"
            }  px-4 py-3 text-gray-600 text-sm rounded  placeholder-gray-400`}
            placeholder="*******"
          />
          {state?.error?.password && (
            <span id="nameError" className="text-sm text-red-500 ml-2">
              {state?.error?.password?.[0]}
            </span>
          )}
        </div>
        <div>
          <label htmlFor="confirmPassword" className="text-gray-600 mb-2 block">
            <span className="text-red-500 " aria-hidden={true}>
              *
            </span>
            Confirm password
          </label>
          <input
            type="password"
            name="confirmPassword"
            id="confirmPassword"
            className={`block w-full border ${
              state?.error?.confirmPassword
                ? "border-red-500"
                : "border-gray-300"
            }  px-4 py-3 text-gray-600 text-sm rounded  placeholder-gray-400`}
            placeholder="*******"
          />
          {state?.error?.confirmPassword && (
            <span id="nameError" className="text-sm text-red-500 ml-2">
              {state?.error?.confirmPassword?.[0]}
            </span>
          )}
        </div>
      </div>
      <div className="mt-6">
        <div className="flex items-center">
          <input
            type="checkbox"
            name="agreement"
            id="agreement"
            className="text-primary focus:ring-0 rounded-sm cursor-pointer"
          />
          <label
            htmlFor="agreement"
            className="text-gray-600 ml-3 cursor-pointer"
          >
            I have read and agree to the
            <Link href="#" className="text-blue-500 underline">
              terms & conditions
            </Link>
          </label>
        </div>
        {state?.error?.agreement && (
          <span id="nameError" className="text-sm text-red-500 ml-2">
            {state?.error?.agreement?.[0]}
          </span>
        )}
      </div>
      <div className="mt-4">
        <button
          type="submit"
          className="block w-full py-2 text-center text-white bg-primary border border-primary rounded hover:bg-transparent hover:text-primary transition uppercase font-roboto font-medium"
        >
          create account
        </button>
      </div>
    </form>
  );
};

export default RegistrationForm;
