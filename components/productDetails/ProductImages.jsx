const { default: Image } = require("next/image");

const ProductImages = () => {
  return (
    <div>
      <Image
        src="/assets/images/products/product1.jpg"
        alt="product"
        className="w-full"
        width={485}
        height={360}
      />
      <div className="grid grid-cols-5 gap-4 mt-4">
        <Image
          src="/assets/images/products/product2.jpg"
          alt="product2"
          className="w-full cursor-pointer border border-primary"
          width={82}
          height={61}
        />
        <Image
          src="/assets/images/products/product3.jpg"
          alt="product2"
          className="w-full cursor-pointer border"
          width={82}
          height={61}
        />
        <Image
          src="/assets/images/products/product4.jpg"
          alt="product2"
          className="w-full cursor-pointer border"
          width={82}
          height={61}
        />
        <Image
          src="/assets/images/products/product5.jpg"
          alt="product2"
          className="w-full cursor-pointer border"
          width={82}
          height={61}
        />
        <Image
          src="/assets/images/products/product6.jpg"
          alt="product2"
          className="w-full cursor-pointer border"
          width={82}
          height={61}
        />
      </div>
    </div>
  );
};

export default ProductImages;
