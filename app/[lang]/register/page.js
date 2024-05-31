import { auth } from "@/auth";
import RegistrationForm from "@/components/register/RegistrationForm";
import LoginWithButtons from "@/components/ui/loginWith/LoginWithButtons";
import { redirect } from "next/navigation";
import { Suspense } from "react";

export default async function RegisterPage() {
  const session = await auth();
  if (session?.user) {
    redirect("/");
  }
  return (
    <div className="contain py-16">
      <div className="max-w-lg mx-auto shadow px-6 py-7 rounded overflow-hidden">
        <h2 className="text-2xl uppercase font-medium mb-1">
          Create an account
        </h2>
        <p className="text-gray-600 mb-6 text-sm">Register for new Customer</p>
        <Suspense>
          <RegistrationForm />
        </Suspense>

        <div className="mt-6 flex justify-center relative">
          <div className="text-gray-600 uppercase px-3 bg-white z-10 relative">
            Or signup with
          </div>
          <div className="absolute left-0 top-3 w-full border-b-2 border-gray-200"></div>
        </div>

        <LoginWithButtons />

        <p className="mt-4 text-center text-gray-600">
          Already have account?{" "}
          <a href="/login" className="text-primary">
            Login now
          </a>
        </p>
      </div>
    </div>
  );
}
