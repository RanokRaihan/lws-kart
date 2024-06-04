import Link from "next/link";

export default function SuccessPage() {
  return (
    <div className="min-h-[40vh] flex flex-col gap-4 items-center justify-center">
      <h1 className="text-6xl text-center text-green-500">
        Order placed successfuly
      </h1>
      <Link
        href="/shop"
        className="bg-blue-500 inline-block text-white px-4 py-2 rounded-md"
      >
        see more product
      </Link>
    </div>
  );
}
