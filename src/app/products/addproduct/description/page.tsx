"use client";
// import Image from "next/image";
import React, { useEffect, useRef } from "react";
import { useState, useContext } from "react";
import { MdKeyboardArrowUp, MdKeyboardArrowDown } from "react-icons/md";
import {
  CategoriesContext,
  TempProductObjContext,
} from "@/context/RootContext";
import { useRouter } from "next/navigation";
import Image from "next/image";

const AddProductDescription = () => {
  // Use context
  const myCategoriesContext = useContext(CategoriesContext);
  const myTempProductObjContext = useContext(TempProductObjContext);

  // Handle undefined context to ensure context is not null before Destructuring
  if (!myCategoriesContext) {
    throw new Error("category must be used within a RootContext provider");
  }
  if (!myTempProductObjContext) {
    throw new Error("product must be used within a RootContext provider");
  }
  // Destructure after ensuring it's not null
  const { categories } = myCategoriesContext;
  const { tempProductObj, setTempProductObj } = myTempProductObjContext;
  // ------------------------------context end ----------------------
  //for navigation
  const router = useRouter();
  //for dopdown icon
  const [isCategoryDropdownOpen, setIsCategoryDropdownOpen] = useState(false);
  //store one description obj
  const [oneProductDescription, setOneProductDescription] = useState({
    name: "",
    category: "",
    brand: "",
    image: "",
  });
  // -------------autopopulate data in form ------------
  useEffect(() => {
    //property must remain present to populate
    if (
      tempProductObj &&
      (tempProductObj.name,
      tempProductObj.category,
      tempProductObj.brand,
      tempProductObj.image)
    ) {
      setOneProductDescription({
        name: tempProductObj.name || "", //for undefined case for the property as property is optional in tempProductObj but not in
        category: tempProductObj.category || "",
        brand: tempProductObj.brand || "",
        image: tempProductObj.image || "",
      });
    }
  }, [tempProductObj]);

  // ----------------error ---------------
  const [error, setError] = useState("");

  const fileInputRef = useRef<HTMLInputElement>(null);
  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOneProductDescription({
      ...oneProductDescription,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]; // Get the selected file
    if (file) {
      const imageUrl = URL.createObjectURL(file); // Create a temporary URL
      setOneProductDescription({ ...oneProductDescription, image: imageUrl });
    }
  };

  //-----------------------validation----------------
  const isValidateReqFields = () => {
    if (
      oneProductDescription.name.trim() === "" ||
      oneProductDescription.category.trim() === "" ||
      oneProductDescription.brand.trim() === "" ||
      oneProductDescription.image === ""
    ) {
      setError("All are required fields");
      return false;
    }
    return true;
  };

  //---------------------------for add category-----------------------
  const handleoneProductDescription = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    //remove all prev error
    setError("");
    //validation
    if (isValidateReqFields() === false) {
      return;
    }

    if (setTempProductObj) {
      setTempProductObj({
        ...(tempProductObj !== null ? tempProductObj : {}), //properties whose value is already stored in this object or declared but still has
        // undefined type bz it(undefined property) will be stored in later pages
        name: oneProductDescription.name.trim() || "",
        category: oneProductDescription.category || "",
        brand: oneProductDescription.brand.trim() || "",
        image: oneProductDescription.image || "",
      });
    }

    router.push("/products/addproduct/variants");
  };

  return (
    <form
      className="max-w-[500px] w-[100%]"
      onSubmit={handleoneProductDescription}
    >
      <div className="card bg-base-100 max-w-[500px] shadow-[0px_0px_20px_-2px_rgba(0,0,0,0.1)] mt-2">
        <div className="card-body p-5">
          {/* description heading  */}
          <h2 className="card-title text-base text-mytextblack font-myFontWorksans font-semibold">
            Description
          </h2>

          {/*-------------Product name input------------- */}
          <div className="form-control">
            <label className="label">
              <span className="label-text text-mytextblack font-myFontWorksans font-normal">
                Product name *
              </span>
            </label>
            <input
              type="text"
              className="input border-solid border-myinputborder w-full focus:outline-none h-[40px] text-mytextblack font-myFontWorksans font-normal"
              name="name"
              value={oneProductDescription.name}
              autoFocus
              onChange={handleInput}
            />
          </div>

          {/*-------------Category dropdown btn------------- */}
          <div className="form-control">
            <label className="label">
              <span className="label-text text-mytextblack font-myFontWorksans font-normal">
                Category *
              </span>
            </label>

            <div className="relative  w-full">
              <select
                className="text-sm w-full h-[40px] pl-4 pr-10 text-mytextblack border border-solid border-myinputborder rounded-lg cursor-pointer focus:outline-none appearance-none "
                name="category"
                value={oneProductDescription.category}
                onChange={(e) => {
                  setOneProductDescription(() => ({
                    ...oneProductDescription,
                    category: e.target.value,
                  }));
                }}
                onClick={() =>
                  setIsCategoryDropdownOpen(!isCategoryDropdownOpen)
                }
              >
                <option
                  value=""
                  className="px-4 py-2 text-gray-700 hover:bg-gray-100 cursor-pointer font-myFontWorksans font-normal"
                ></option>
                {categories.map((item, index) => (
                  <option
                    key={index}
                    value={item.name}
                    className="px-4 py-2 text-gray-700 hover:bg-gray-100 cursor-pointer font-myFontWorksans font-normal"
                  >
                    {item.name}
                  </option>
                ))}
              </select>

              {/* Custom Icon */}
              <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
                {isCategoryDropdownOpen ? (
                  <MdKeyboardArrowUp className="w-8 h-4 text-mygrey-light" />
                ) : (
                  <MdKeyboardArrowDown className="w-8 h-4 text-mygrey-light" />
                )}
              </div>
            </div>
          </div>

          {/*---------------------brand input--------------------- */}
          <div className="form-control">
            <label className="label">
              <span className="label-text text-mytextblack font-myFontWorksans font-normal">
                Brand *
              </span>
            </label>
            <input
              type="text"
              className="input border-solid border-myinputborder w-full focus:outline-none h-[40px] text-mytextblack font-myFontWorksans font-normal"
              name="brand"
              value={oneProductDescription.brand}
              onChange={handleInput}
            />
          </div>
          {/*---------------------file upload --------------------- */}

          <input
            type="file"
            accept="image/*"
            name="file"
            className="hidden"
            onChange={handleFileInput}
            ref={fileInputRef}
          />
          <div className="flex items-center pl-0 p-4 justify-start">
            <button
              type="button"
              className="btn btn-outline w-[171px] h-[42px] text-primary bg-mywhite hover:bg-primary-light hover:text-primary text-base"
              onClick={() => {
                fileInputRef.current?.click();
              }}
            >
              <div className=" relative w-[20px] h-[20px] ">
                <Image
                  src="/assets/icons/uploadimageIcon.svg"
                  alt="upload"
                  fill
                  sizes="20px" //for width mandatory with fill
                />
              </div>

              <p className="font-myFontWorksans font-normal">Upload Image</p>
            </button>
            {/* display uploaded img  */}
            {/* {oneProductDescription.image && (
            <Image src={oneProductDescription.image} alt="img" width={20} height={20} />
          )} */}
          </div>
          {error && <div className="my-2 text-[#EE2A2A]">{error}</div>}
        </div>
      </div>
      {/*---------------------buttons--------------------- */}
      <div className="flex justify-end gap-[10px] mt-6">
        <button
          className="btn w-[120px] h-[42px] text-primary bg-secondary text-base"
          type="button"
          onClick={() => {
            router.push("/products"); // Navigates to the previous page
          }}
        >
          Cancel
        </button>
        <button
          className="btn w-[120px] h-[42px] text-mywhite bg-primary hover:bg-primary-light hover:text-primary text-base"
          type="submit"
        >
          Next
        </button>
      </div>
    </form>
  );
};

export default AddProductDescription;
