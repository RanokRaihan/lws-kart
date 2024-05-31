import Link from "next/link";

const HeroSection = () => {
  return (
    <div
      className="bg-cover bg-no-repeat bg-center py-36"
      style={{ backgroundImage: "url('/assets/images/banner-bg.jpg')" }}
    >
      <div className="container">
        <h1 className="text-6xl text-gray-800 font-medium mb-4 capitalize">
          Discover Your Style <br /> in this summer
        </h1>
        <p className="w-full md:w-1/2">
          Explore the latest trends and timeless classics. Shop our curated
          collections and elevate your wardrobe with unique pieces tailored just
          for you.
        </p>
        <div className="mt-12">
          <Link
            href="/shop"
            className="bg-primary border border-primary text-white px-8 py-3 font-medium 
                rounded-md hover:bg-transparent hover:text-primary"
          >
            Shop Now
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
