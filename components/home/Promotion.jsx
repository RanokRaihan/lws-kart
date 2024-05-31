import Image from "next/image";
import Link from "next/link";

const Promotion = () => {
  return (
    <div className="container pb-16 ">
      <Link href="/product/664ea79cd38879aad0db506b">
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
