import Image from "next/image";
import Link from "next/link";

const Promotion = () => {
  return (
    <div className="container pb-16 ">
      <Link href="#">
        <Image
          src="/assets/images/offer.jpg"
          alt="ads"
          width={1248}
          height={300}
          className="w-full"
        />
      </Link>
    </div>
  );
};

export default Promotion;
