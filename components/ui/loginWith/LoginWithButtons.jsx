import { signInWithGoogle } from "@/actions";

const LoginWithButtons = () => {
  return (
    <div className="mt-4 flex justify-between gap-4">
      <form action="" className="w-1/2">
        <button
          type="submit"
          className="w-full py-2 text-center text-white bg-blue-800 rounded uppercase font-roboto font-medium text-sm hover:bg-blue-700"
        >
          facebook
        </button>
      </form>
      <form action={signInWithGoogle} className="w-1/2">
        <button
          type="submit"
          className="py-2 w-full text-center text-white bg-red-600 rounded uppercase font-roboto font-medium text-sm hover:bg-red-500"
        >
          google
        </button>
      </form>
    </div>
  );
};

export default LoginWithButtons;
