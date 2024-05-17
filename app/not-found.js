import sadGirlImage from "@/public/assets/images/not-found/sad-girl.jpg";

import Image from "next/image";
import Link from "next/link";

export default function RootNotFound() {
  return (
    <div className="w-full min-h-[70vh] flex items-center justify-center p-4">
      <div className="w-[850px] h-[400px] flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="size-[300px]  relative rounded-2xl overflow-hidden shadow-sm flex-shrink-0">
          <Image
            src={sadGirlImage}
            alt="sad girl image"
            className="object-cover"
          />
        </div>
        <div className="space-y-4 md:space-y-8">
          <h1 className="md:text-6xl text-4xl font-semibold text-cyan-400">
            Page not found
          </h1>
          <p className="text-gray-500 text-xl">
            We looked everywhere for the page. It seems like the page does not
            exists or temporarily unavailable.
          </p>
          <Link
            className="inline-block px-4 py-2 rounded-md border text-cyan-400 border-cyan-400 hover:text-white hover:bg-cyan-400 transition-colors duration-200"
            href="/"
          >
            Go to Homepage
          </Link>
        </div>
      </div>
    </div>
  );
}
