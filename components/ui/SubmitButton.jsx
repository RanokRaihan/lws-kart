"use client";
import { useFormStatus } from "react-dom";
const SubmitButton = ({ className, children }) => {
  const { pending } = useFormStatus();
  console.log(pending);
  return (
    <button
      type="submit"
      className={`relative ${className}`}
      disabled={pending}
    >
      {pending && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-white"></div>
        </div>
      )}
      <span className={pending ? "opacity-0" : "opacity-100"}>{children}</span>
    </button>
  );
};

export default SubmitButton;
