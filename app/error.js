"use client";
import Link from "next/link";

export default function ErrorPage() {
  return (
    <div className="h-[60vh] bg-gray-100 text-center flex flex-col items-center justify-center gap-7">
      <h1 className="text-4xl">Something Went wrong!</h1>
      <Link href="/" className="bg-blue-500 text-white px-4 py-2 rounded-md">
        go to home page
      </Link>
    </div>
  );
}
