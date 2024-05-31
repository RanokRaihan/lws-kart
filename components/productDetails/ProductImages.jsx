"use client";
import Image from "next/image";
import { useState } from "react";

const ProductImages = ({ images }) => {
  const [thumbnail, setThumbnail] = useState(null);

  return (
    <div>
      <div className="w-full h-96 relative">
        <Image
          src={thumbnail ?? images?.[0]}
          alt="product"
          className="object-contain"
          fill
        />
      </div>

      <div className="grid grid-cols-5 gap-4 mt-4">
        {images?.length > 0 &&
          images.map((image, i) => (
            <div
              onClick={() => setThumbnail(image)}
              key={i}
              className="w-full h-24 relative  bg-gray-50 border border-gray-100 "
              role="button"
              tabIndex={0}
            >
              <Image
                src={image}
                alt="product2"
                className="object-contain"
                fill
              />
            </div>
          ))}
      </div>
    </div>
  );
};

export default ProductImages;
