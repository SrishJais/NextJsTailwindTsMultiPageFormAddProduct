"use client";
import AddCategoryModal from "@/components/AddCategoryModal";
import ProductCard from "@/components/ProductCard";
import React, { useContext, useState } from "react";
import { useRouter } from "next/navigation";
import { ProductsContext, CategoriesContext } from "@/context/RootContext";

const Products = () => {
  // Use context
  const myProductsContext = useContext(ProductsContext);
  const myCategoriesContext = useContext(CategoriesContext);

  if (!myProductsContext) {
    throw new Error("product must be used within a RootContext provider");
  }
  if (!myCategoriesContext) {
    throw new Error("category must be used within a RootContext provider");
  }
  //destructure
  const { products } = myProductsContext;
  const { categories } = myCategoriesContext;

  // ------------------------------context end ----------------------
  //for modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  //for navigation
  const router = useRouter();
  return (
    <>
      <header className="grid md:grid-cols-12 py-4 bg-white  ">
        <h6 className="text-2xl md:col-span-6 mb-2 font-myFontWorksans font-semibold">
          Products
        </h6>
        <div className="md:col-span-6 flex justify-end gap-[7px] ">
          {/* --------------------Add Category modal btn ----------------------------- */}
          {/* Button to open modal */}
          <button
            className="btn w-[155px] h-[42px] text-primary bg-secondary font-myFontWorksans font-semibold"
            // Open modal on click
            onClick={() => setIsModalOpen(true)}
          >
            Add Category
          </button>
          <AddCategoryModal isopen={isModalOpen} setisopen={setIsModalOpen} />
          {/* --------------------Add Product btn ---------------------------------- */}

          <button
            className="btn w-[155px] h-[42px] text-mywhite bg-primary hover:bg-primary-light hover:text-primary font-myFontWorksans font-semibold"
            onClick={() => router.push("/products/addproduct/description")}
          >
            Add Product
          </button>
        </div>
      </header>

      {/* flex and overflow layout  */}
      <main className="md:flex gap-5 mb-4 md:mb-0 w-full md:max-w-[100vw] lg:max-w-[calc(100vw-360px)] md:flex-nowrap md:overflow-x-auto [scrollbar-width:thin]">
        {categories.map((categoryItem) => {
          return (
            <div
              key={categoryItem.id}
              className="md:min-w-[320px] md:max-w-[320px] md:h-[80vh] bg-[#D9D9D966] p-4 rounded-[10px] mb-4"
            >
              <h6 className="text-base font-myFontWorksans font-medium">
                {categoryItem.name}
              </h6>
              <div className="md:h-full md:overflow-y-auto [scrollbar-width:thin]">
                <div
                  className="flex flex-nowrap md:flex-wrap md:flex-none gap-[10px]  overflow-x-auto [scrollbar-width:thin]"
                  // style={{ scrollbarWidth: "none" }}
                >
                  {products
                    .filter(
                      (productItem) =>
                        productItem.category === categoryItem.name
                    )
                    .map((filteredProductItem, index) => (
                      <ProductCard
                        key={index}
                        {...{
                          name: filteredProductItem.name,
                          price: filteredProductItem.priceInr,
                          brand: filteredProductItem.brand,
                          image: filteredProductItem.image,
                        }}
                      />
                    ))}
                </div>
              </div>
            </div>
          );
        })}
      </main>
    </>
  );
};

export default Products;
