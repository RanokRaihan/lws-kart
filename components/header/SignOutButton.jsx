import { signOutAction } from "@/actions";

const SignOutButton = () => {
  return (
    <form action={signOutAction}>
      <button type="submit" className="bg-red-500 rounded-md px-4 py-2">
        Logout
      </button>
    </form>
  );
};

export default SignOutButton;
