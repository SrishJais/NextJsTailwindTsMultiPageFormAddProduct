"use client";
import React, { useEffect } from "react";
import { useState, useContext } from "react";
import { TempProductObjContext, ProductsContext } from "@/context/RootContext";
import { useRouter } from "next/navigation";

const Priceinfo = () => {
  // Use context
  const myTempProductObjContext = useContext(TempProductObjContext);

  const myProductsContext = useContext(ProductsContext);
  if (!myTempProductObjContext) {
    throw new Error("product must be used within a RootContext provider");
  }
  if (!myProductsContext) {
    throw new Error("product must be used within a RootContext provider");
  }
  //destructure
  const { tempProductObj, setTempProductObj } = myTempProductObjContext;
  const { products, setProducts } = myProductsContext;
  // ------------------------------context end ----------------------
  //for navigation
  const router = useRouter();

  const [onePriceInfoData, setOnePriceInfoData] = useState<{
    priceInr: number | null;
    discount: {
      method: "pct" | "flat";
      value: number | null;
    };
  }>({
    priceInr: null, //Remember - number type in original product .We used string bz in type it is not said that its type can also be null
    discount: {
      method: "pct", // Default method set to "pct"
      value: null, //Remember - number type in original product .We used string bz in type it is not said that its type can also be null
    },
  });
  // -------------autopopulate data in form ------------
  useEffect(() => {
    //property must remain present to populate
    if (tempProductObj && tempProductObj.priceInr && tempProductObj.discount) {
      setOnePriceInfoData({
        priceInr: tempProductObj.priceInr,
        discount: {
          method: tempProductObj.discount.method,
          value: tempProductObj.discount.value,
        },
      });
    }
  }, [tempProductObj]);

  //error
  const [error, setError] = useState({
    priceError: "",
    discountValueError: "",
    finalError: "",
  });

  //-----------------------validation----------------
  const isValidateReqFields = () => {
    let isValid = true;
    if (onePriceInfoData.priceInr === null) {
      setError((prev) => ({ ...prev, priceError: "Price is required" }));
      isValid = false;
    } else if (Number(onePriceInfoData.priceInr) < 0) {
      //for value="" as value does not store null
      setError((prev) => ({
        ...prev,
        priceError: "Price must be a positive number",
      }));
      isValid = false;
    }
    if (isNaN(Number(onePriceInfoData.discount.value))) {
      setError((prev) => ({
        ...prev,
        discountValueError: "Discount must be a number",
      }));
      isValid = false;
    }

    return isValid;
  };

  //---------------------------handle price info confirm -----------------------
  const handlePriceInfo = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    //remove all prev error
    setError({
      priceError: "",
      discountValueError: "",
      finalError: "",
    });

    //validation
    if (isValidateReqFields() === false) {
      return;
    }
    //save temp obj first in new variable
    const newTempProductObj = {
      ...(tempProductObj !== null ? tempProductObj : {}), //properties whose value is already stored in this object or declared but still has
      // undefined type bz it(undefined property) will be stored in later pages
      priceInr: Number(onePriceInfoData.priceInr), //change to number if value=""
      discount: {
        method: onePriceInfoData.discount.method,
        value: Number(onePriceInfoData.discount.value), //change to number if value=""
      },
    };
    //store in temp obj
    if (setTempProductObj) {
      setTempProductObj(newTempProductObj);
    }

    if (
      !newTempProductObj.name ||
      !newTempProductObj.category ||
      !newTempProductObj.brand ||
      !newTempProductObj.image ||
      !newTempProductObj.combinations ||
      !newTempProductObj.priceInr ||
      !newTempProductObj.discount
    ) {
      setError((prev) => ({
        ...prev,
        finalError:
          "Please fill in all required fields of the form before final submit",
      }));
      // alert("Please fill in all required fields before submitting.");
      return;
    }

    //store in products if all req properties are present
    //Store in products arr as all validations are correct
    setProducts([
      ...products,
      {
        name: newTempProductObj.name,
        category: newTempProductObj.category,
        brand: newTempProductObj.brand,
        image: newTempProductObj.image,
        variants: newTempProductObj.variants ?? [], // Default to empty array if missing
        combinations: newTempProductObj.combinations, // Ensure required keys
        priceInr: newTempProductObj.priceInr ?? 0, // Default price to 0
        discount: newTempProductObj.discount, // Default discount
      },
    ]);

    //empty setTempProductObj
    if (setTempProductObj) {
      setTempProductObj(null);
    }

    // Ensure this line is outside the if block
    router.push("/products");
  };

  return (
    <form onSubmit={handlePriceInfo} className="max-w-[510px] w-[100%]">
      <div className="card bg-base-100 shadow-[0px_0px_20px_-2px_rgba(0,0,0,0.1)] mt-2">
        <div className="card-body p-5">
          {/* description heading  */}
          <h2 className="card-title text-base text-mytextblack font-myFontWorksans font-semibold">
            Price Info
          </h2>

          {/*-------------Price input------------- */}
          <div className="form-control relative">
            <label className="label">
              <span className="label-text text-mytextblack font-myFontWorksans font-normal">
                Price *
              </span>
            </label>
            <p className="text-base absolute left-[13px] top-[43.9px]">₹</p>
            <input
              type="number"
              className="input border-solid border-myinputborder w-full focus:outline-none h-[40px] text-mytextblack pl-6 font-myFontWorksans font-normal"
              value={
                onePriceInfoData.priceInr === null ||
                onePriceInfoData.priceInr === 0
                  ? ""
                  : onePriceInfoData.priceInr
              } //value cannot store null in input
              name="priceInr"
              autoFocus
              onChange={(e) =>
                setOnePriceInfoData({
                  ...onePriceInfoData,
                  priceInr: e.target.value === "" ? 0 : Number(e.target.value), //e.target.value is of string only in any input
                })
              }
            />
          </div>
          {error.priceError && (
            <div className="text-[#EE2A2A]">{error.priceError}</div>
          )}

          {/*---------------------Discount input--------------------- */}
          <div className="form-control">
            <label className="label">
              <span className="label-text text-mytextblack font-myFontWorksans font-normal">
                Discount
              </span>
            </label>
            <div className="flex justify-between gap-[16px]">
              <input
                type="number"
                className="input border-solid border-myinputborder w-full focus:outline-none h-[40px] max-w-[370px] text-mytextblack font-myFontWorksans font-normal"
                value={
                  onePriceInfoData.discount.value === null ||
                  onePriceInfoData.discount.value === 0
                    ? ""
                    : onePriceInfoData.discount.value
                }
                name="discountValue"
                onChange={(e) =>
                  setOnePriceInfoData({
                    ...onePriceInfoData, // Keep the existing state
                    discount: {
                      ...onePriceInfoData.discount, // Keep the existing discount object
                      value: e.target.value === "" ? 0 : Number(e.target.value), // Update the discount value
                    },
                  })
                }
              />
              {/*---------------------Discount unit btn--------------------- */}
              <div className="flex">
                <input
                  type="button"
                  name="pct"
                  className={`p-2 h-[40px] w-[40px] rounded-tl-[8px] rounded-bl-[8px] border cursor-pointer text-[#000000] text-sm font-myFontWorksans font-medium ${
                    onePriceInfoData.discount.method === "pct"
                      ? "bg-[#E6EEF2]"
                      : "bg-mywhite"
                  }`}
                  value="%"
                  onClick={() =>
                    setOnePriceInfoData({
                      ...onePriceInfoData, // Keep previous state
                      discount: {
                        ...onePriceInfoData.discount, // Keep the existing discount object
                        method: "pct", // Update the method to "flat"
                      },
                    })
                  }
                />
                <input
                  type="button"
                  name="flat"
                  value="$"
                  className={`p-2 h-[40px] w-[40px] rounded-tr-[8px] rounded-br-[8px] border cursor-pointer  text-[#000000] text-sm font-myFontWorksans font-normal ${
                    onePriceInfoData.discount.method === "flat"
                      ? "bg-[#E6EEF2]"
                      : "bg-mywhite"
                  }`}
                  onClick={() =>
                    setOnePriceInfoData({
                      ...onePriceInfoData, // Keep previous state
                      discount: {
                        ...onePriceInfoData.discount, // Keep the existing discount object
                        method: "flat", // Update the method to "flat"
                      },
                    })
                  }
                />
              </div>
            </div>
          </div>
          {error.discountValueError && (
            <div className="text-[#EE2A2A]">{error.discountValueError}</div>
          )}
        </div>
        {error.finalError && (
          <div className="text-[#EE2A2A] p-5 pt-0">{error.finalError}</div>
        )}
      </div>
      {/*---------------------buttons--------------------- */}
      <div className="flex justify-end gap-[10px] mt-6">
        <button
          className="btn w-[120px] h-[42px] text-primary bg-secondary text-base"
          onClick={() => router.back()}
        >
          Back
        </button>
        <button
          type="submit"
          className="btn w-[120px] h-[42px] text-mywhite bg-primary hover:bg-primary-light hover:text-primary text-base"
        >
          Confirm
        </button>
      </div>
    </form>
  );
};

export default Priceinfo;
