import Image from "next/image";
import React from "react";
import "../css/productcard.css";

const ProductCard = ({
  name,
  price,
  brand,
  image,
}: {
  name: string;
  price: number;
  brand: string;
  image: string;
}) => {
  return (
    <div className="card bg-base-100 shadow-[0px_0px_20px_-2px_rgba(0,0,0,0.1)] mt-2 p-1 md:w-[100%] min-w-[100px]">
      <div className="card-body p-1" style={{ zIndex: "-1px" }}>
        <div className="flex flex-col md:flex-row">
          {/* responsive img in nextjs */}
          <div className="flex w-full md:w-[84px] justify-center md:justify-start mb-2 md:mb-0">
            <div className="relative">
              <div className=" relative w-[84px] h-[84px] ">
                <Image
                  src={image}
                  alt="product"
                  fill
                  sizes="84px" //for width mandatory with fill
                />
              </div>
            </div>
          </div>
          <div className="md:ml-3 md:pr-1">
            <h6 className="text-base text-center md:text-start font-myFontWorksans font-medium">
              {name}
            </h6>
            <p className="text-sm text-center md:text-start font-myFontWorksans font-normal">
              ₹{price.toLocaleString("en-IN")}
            </p>
            <div className="w-[100%] h-[25px] rounded-lg mt-2 flex md:flex-none justify-center md:justify-start ">
              <span className="text-sm bg-primary-light text-primary rounded-md px-2 py-1 font-myFontWorksans font-medium">
                {brand}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
