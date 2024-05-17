import RegistrationForm from "@/components/register/RegistrationForm";
import LoginWithButtons from "@/components/ui/loginWith/LoginWithButtons";

export default function RegisterPage() {
  return (
    <div class="contain py-16">
      <div class="max-w-lg mx-auto shadow px-6 py-7 rounded overflow-hidden">
        <h2 class="text-2xl uppercase font-medium mb-1">Create an account</h2>
        <p class="text-gray-600 mb-6 text-sm">Register for new Customer</p>

        <RegistrationForm />

        <div class="mt-6 flex justify-center relative">
          <div class="text-gray-600 uppercase px-3 bg-white z-10 relative">
            Or signup with
          </div>
          <div class="absolute left-0 top-3 w-full border-b-2 border-gray-200"></div>
        </div>

        <LoginWithButtons />

        <p class="mt-4 text-center text-gray-600">
          Already have account?{" "}
          <a href="/login" class="text-primary">
            Login now
          </a>
        </p>
      </div>
    </div>
  );
}
