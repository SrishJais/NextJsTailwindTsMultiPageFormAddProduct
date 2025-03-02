"use client";
import React, { useContext, useEffect, useState } from "react";
import TagsInput from "@/components/TagsInput";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { TempProductObjContext } from "@/context/RootContext";

const Variants = () => {
  const myTempProductObjContext = useContext(TempProductObjContext);
  if (!myTempProductObjContext) {
    throw new Error("Combinations must be used within a RootContext provider");
  }
  //destructure
  const { tempProductObj, setTempProductObj } = myTempProductObjContext;

  const [variantsRows, setVariantsRows] = useState<
    { name: string; values: string[] }[]
  >([]);
  // -------------autopopulate data in form ------------
  useEffect(() => {
    //property must remain present to populate
    if (tempProductObj && tempProductObj.variants) {
      setVariantsRows(tempProductObj.variants); //for undefined case
    }
  }, [tempProductObj]);

  // errors
  const [errors, setErrors] = useState<{ name?: string; values?: string }[]>(
    []
  );
  const router = useRouter();

  // Function to add a new row
  const handleAddRow = () => {
    setVariantsRows([...variantsRows, { name: "", values: [] }]);
    setErrors([...errors, {}]); // Add an empty error object for the new row
  };

  const handleNextClick = () => {
    // Force update of any unconfirmed tag input
    document
      .querySelectorAll<HTMLInputElement>(".tagify__input")
      .forEach((input) => {
        input.dispatchEvent(new Event("change", { bubbles: true }));
      });

    const newErrors = variantsRows.map((row) => ({
      name: row.name.trim() === "" ? "name can't be empty" : undefined,
      values: row.values.length === 0 ? "Values can't be empty" : undefined,
    }));

    setErrors(newErrors);

    if (newErrors.every((error) => !error.name && !error.values)) {
      //store in temp obj
      if (setTempProductObj) {
        setTempProductObj({
          ...(tempProductObj !== null ? tempProductObj : {}), //properties whose value is already stored in this object or declared but still has
          variants: [...variantsRows],
        });
      }

      router.push("/products/addproduct/combinations");
    }
  };

  return (
    <div className="max-w-[500px] w-[100%]">
      <div className="card bg-base-100 shadow-[0px_0px_20px_-2px_rgba(0,0,0,0.1)] mt-2">
        <div className="card-body p-5">
          <h2 className="card-title text-base text-mytextblack font-myFontWorksans font-semibold">
            Variants
          </h2>

          <div className="overflow-x-auto" style={{ scrollbarWidth: "none" }}>
            <table className="table">
              <thead>
                <tr className="flex gap-[8px]">
                  <th className="pl-0 w-[140px] text-sm text-mytextblack font-myFontWorksans font-normal">
                    name *
                  </th>
                  <th className="pl-0 w-[280px] text-sm text-mytextblack font-myFontWorksans font-normal">
                    Values *
                  </th>
                  <th className="w-[16px]"></th>
                </tr>
              </thead>
              <tbody>
                {variantsRows.map((item, index) => (
                  <tr key={index} className="flex gap-[10px] ">
                    <td className="pl-0">
                      <div>
                        <input
                          type="text"
                          className={`input text-sm border-solid w-[140px] focus:outline-none h-[40px] text-mytextblack font-myFontWorksans font-normal
      ${errors[index]?.name ? "border-[#EE2A2A]" : "border-myinputborder"}`}
                          name={`variant-name-${index}`}
                          value={item.name}
                          autoFocus={index === 0}
                          onChange={(e) => {
                            const newRows = [...variantsRows];
                            newRows[index].name = e.target.value.trim();
                            setVariantsRows(newRows);
                          }}
                        />
                        {(errors[index]?.name || errors[index]?.values) && (
                          <div className="mt-1 h-[15px] ">
                            {errors[index]?.name && (
                              <p className="text-[#EE2A2A] text-xs font-myFontWorksans font-normal">
                                {errors[index].name}
                              </p>
                            )}
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="pl-0">
                      <TagsInput
                        value={item.values}
                        onChange={(newValues: string[]) => {
                          const newRows = [...variantsRows];
                          newRows[index].values = newValues; // Ensure proper array structure
                          setVariantsRows(newRows);
                        }}
                        err={errors[index]}
                      />
                    </td>

                    <td className="p-0 pt-3 flex items-center">
                      <div className=" relative w-[16px] h-[16px] ">
                        <Image
                          src="/assets/icons/variantrowdeleteIcon.svg"
                          alt="delete"
                          fill
                          sizes="16px" //for width mandatory with fill
                          onClick={() => {
                            setVariantsRows((prevRows) =>
                              prevRows.filter((_, i) => i !== index)
                            );
                            setErrors((prevErrors) =>
                              prevErrors.filter((_, i) => i !== index)
                            );
                          }}
                          className="cursor-pointer"
                        />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="flex mt-4 cursor-pointer">
              <Image
                src="/assets/icons/addvariantIcon.svg"
                alt="add icon"
                height={0}
                width={0}
                style={{ width: "16px", height: "16px" }} // Maintain aspect ratio
              />

              <h6
                className="ml-1 text-sm text-primary font-myFontWorksans font-normal"
                onClick={handleAddRow}
              >
                Add name
              </h6>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-end gap-[10px] mt-6">
        <button
          className="btn w-[120px] h-[42px] text-primary bg-secondary text-base"
          onClick={() => {
            router.back(); // Navigates to the previous page
          }}
        >
          Back
        </button>
        <button
          className="btn w-[120px] h-[42px] text-mywhite bg-primary hover:bg-primary-light hover:text-primary text-base"
          onClick={handleNextClick}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Variants;
