"use client";
import React, { useState, useContext, useEffect } from "react";
import { TempProductObjContext } from "@/context/RootContext";
import { useRouter } from "next/navigation";
import { CombinationObj } from "@/typescriptTypes/types";

const Combinations = () => {
  const myTempProductObjContext = useContext(TempProductObjContext);
  if (!myTempProductObjContext) {
    throw new Error("Combinations must be used within a RootContext provider");
  }
  //destructure
  const { tempProductObj, setTempProductObj } = myTempProductObjContext;

  const router = useRouter();

  const [productCombinationsData, setProductCombinationsData] =
    useState<CombinationObj>({
      a: { name: "M/Black", sku: "", quantity: null, inStock: false },
      b: { name: "M/Red", sku: "", quantity: null, inStock: false },
      c: { name: "L/Black", sku: "", quantity: null, inStock: false },
      d: { name: "L/Red", sku: "", quantity: null, inStock: false },
    });
  // -------------autopopulate data in form ------------
  useEffect(() => {
    //property must remain present to populate
    if (tempProductObj && tempProductObj.combinations) {
      setProductCombinationsData(tempProductObj.combinations); //for undefined case
    }
  }, [tempProductObj]);

  //errors
  const [errors, setErrors] = useState({
    a: { sku: "", quantity: "" },
    b: { sku: "", quantity: "" },
    c: { sku: "", quantity: "" },
    d: { sku: "", quantity: "" },
  });

  // Validation function
  const isValidateReqFields = () => {
    const tempErrors = {
      a: { sku: "", quantity: "" },
      b: { sku: "", quantity: "" },
      c: { sku: "", quantity: "" },
      d: { sku: "", quantity: "" },
    };

    const skuValues: string[] = []; // Track used SKUs

    Object.keys(productCombinationsData).forEach((key) => {
      const item = productCombinationsData[key as keyof CombinationObj];
      const sku = item.sku.trim().toUpperCase();
      const fieldErrors = { sku: "", quantity: "" };

      // SKU Validation
      if (sku === "") {
        fieldErrors.sku = "SKU is required.";
      } else if (skuValues.includes(sku)) {
        fieldErrors.sku = "Duplicate SKU.";
      } else {
        skuValues.push(sku);
      }

      // Quantity Validation (only if inStock is true)
      if (item.inStock) {
        if (item.quantity === null) {
          fieldErrors.quantity = "Quantity is required.";
        } else if (isNaN(Number(item.quantity)) || Number(item.quantity) < 0) {
          fieldErrors.quantity = "must be a non-negative number";
        }
      }

      if (fieldErrors.sku || fieldErrors.quantity) {
        tempErrors[key as keyof typeof tempErrors] = fieldErrors;
      }
    });

    setErrors(tempErrors);
    return !Object.values(tempErrors).some(
      (error) => error.sku || error.quantity
    );
  };
  // -------------------When Next btn is clicked ----------------
  const handleProductCombinationData = (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    if (!isValidateReqFields()) return;

    //store in temp obj
    if (setTempProductObj) {
      setTempProductObj({
        ...(tempProductObj !== null ? tempProductObj : {}), //properties whose value is already stored in this object or declared but still has
        combinations: { ...productCombinationsData },
      });
    }

    // Store and navigate
    router.push("/products/addproduct/priceinfo");
  };

  const handleSkuChange = (key: keyof CombinationObj, value: string) => {
    setProductCombinationsData((prev) => ({
      ...prev,
      [key]: { ...prev[key], sku: value.toUpperCase() },
    }));
    setErrors((prevErrors) => ({
      ...prevErrors,
      [key]: { ...prevErrors[key], sku: "" },
    }));
  };

  const handleStockToggle = (key: keyof CombinationObj) => {
    setProductCombinationsData((prev) => ({
      ...prev,
      [key]: { ...prev[key], inStock: !prev[key].inStock },
    }));
  };

  const handleQuantityChange = (key: keyof CombinationObj, value: string) => {
    setProductCombinationsData((prev) => ({
      ...prev,
      [key]: { ...prev[key], quantity: value.trim() },
    }));
    setErrors((prevErrors) => ({
      ...prevErrors,
      [key]: { ...prevErrors[key], quantity: "" },
    }));
  };

  return (
    <form
      className="max-w-[500px] w-[100%]"
      onSubmit={handleProductCombinationData}
    >
      <div className="card bg-base-100 shadow-md mt-2">
        <div className="card-body p-5">
          <h2 className="card-title text-base text-mytextblack font-myFontWorksans font-semibold">
            Combinations
          </h2>
          <div className="overflow-x-auto" style={{ scrollbarWidth: "none" }}>
            <table className="table">
              <thead>
                <tr className="flex justify-between">
                  <th className="w-[55px]"></th>
                  <th className="w-[140px] text-xs text-mytextblack pl-0 font-myFontWorksans font-normal">
                    SKU *
                  </th>
                  <th className="w-[44px] text-xs text-mytextblack pl-0 font-myFontWorksans font-normal">
                    In stock
                  </th>
                  <th className="w-[130px] text-xs text-mytextblack pl-0 font-myFontWorksans font-normal">
                    Quantity
                  </th>
                </tr>
              </thead>
              <tbody>
                {Object.keys(productCombinationsData).map((key, index) => {
                  const item =
                    productCombinationsData[key as keyof CombinationObj];
                  return (
                    <tr key={key} className="flex flex-col">
                      <td className="flex justify-between items-center pl-0">
                        <div>
                          <h6 className="text-sm w-[55px] font-myFontWorksans font-normal">
                            {item.name}
                          </h6>

                          {(errors[key as keyof typeof errors]?.sku ||
                            errors[key as keyof typeof errors]?.quantity) && (
                            <div className="h-[15px]"></div>
                          )}
                        </div>
                        {/* SKU Input */}
                        <div className="ml-4 mr-2">
                          <input
                            type="text"
                            name={`sku-${key}`}
                            className={`input text-sm border w-[140px] h-[40px] text-mytextblack focus:outline-none font-myFontWorksans font-normal ${
                              errors[key as keyof typeof errors]?.sku
                                ? "border-[#EE2A2A]"
                                : "border-myinputborder"
                            }`}
                            // name={`variant-name-${index}`}
                            value={item.sku}
                            autoFocus={index === 0}
                            onChange={(e) =>
                              handleSkuChange(
                                key as keyof CombinationObj,
                                e.target.value
                              )
                            }
                          />
                          {(errors[key as keyof typeof errors]?.sku ||
                            errors[key as keyof typeof errors]?.quantity) && (
                            <div className="h-[15px]">
                              {errors[key as keyof typeof errors]?.sku && (
                                <div className="text-[#EE2A2A] text-xs mt-1 font-myFontWorksans font-normal">
                                  {errors[key as keyof typeof errors]?.sku}
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                        {/* In Stock Toggle */}
                        <div className="mr-4 ml-2">
                          <input
                            type="checkbox"
                            name={`instock-${key}`}
                            className={`toggle w-[44px] h-[24px] border-none bg-mywhite hover:bg-mywhite ${
                              item.inStock
                                ? "[--tglbg:#0F172A]"
                                : "[--tglbg:#E2E8F0]"
                            }`}
                            onChange={() =>
                              handleStockToggle(key as keyof CombinationObj)
                            }
                            checked={item.inStock}
                          />
                          {(errors[key as keyof typeof errors]?.sku ||
                            errors[key as keyof typeof errors]?.quantity) && (
                            <div className="h-[15px]"></div>
                          )}
                        </div>

                        {/* Quantity Input */}
                        <div>
                          <input
                            type="number"
                            className={`input text-sm border w-[130px] h-[40px] text-mytextblack focus:outline-none font-myFontWorksans font-normal ${
                              !item.inStock
                                ? "input-disabled"
                                : "border-myinputborder"
                            }`}
                            disabled={!item.inStock}
                            name={`quantity-${key}`}
                            value={item.quantity === null ? "" : item.quantity} //imp
                            onChange={(e) =>
                              handleQuantityChange(
                                key as keyof CombinationObj,
                                e.target.value
                              )
                            }
                          />
                          {(errors[key as keyof typeof errors]?.sku ||
                            errors[key as keyof typeof errors]?.quantity) && (
                            <div className="h-[15px]">
                              {errors[key as keyof typeof errors]?.quantity && (
                                <div className="text-[#EE2A2A] text-xs mt-1 text-wrap w-[130px] font-myFontWorksans font-normal">
                                  {errors[key as keyof typeof errors]?.quantity}
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div className="flex justify-end gap-[10px] mt-6">
        <button
          className="btn w-[120px] h-[42px] text-primary bg-secondary text-base"
          type="button"
          onClick={() => router.back()}
        >
          Back
        </button>
        <button
          className="btn w-[120px] h-[42px] text-mywhite bg-primary hover:bg-primary-light text-base"
          type="submit"
        >
          Next
        </button>
      </div>
    </form>
  );
};

export default Combinations;
