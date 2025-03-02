"use client"; // Ensures this runs only on the client side
//for modal props
import { Category, ModalProps } from "@/typescriptTypes/types";
import { CategoriesContext } from "@/context/RootContext";
import { useContext, useState } from "react";
//for unique id
import { v4 as uuidv4 } from "uuid";

// -----------------------------------------------------------------function----------------------------------------------------------------
const AddCategoryModal = ({ isopen, setisopen }: ModalProps) => {
  // Use context
  const context = useContext(CategoriesContext);

  // Handle undefined context to ensure context is not null before accesing its properties
  //Note - if destructured is done within if(context) then it will be block scope , cannot be accessible outside if block
  if (!context) {
    throw new Error("category must be used within a its provider");
  }
  // Destructure after ensuring it's not null
  const { categories, setCategories } = context;

  //store one opportunity obj
  const [category, setCategory] = useState<Category>({
    id: "",
    name: "",
  });
  const [error, setError] = useState("");
  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCategory({ ...category, [e.target.name]: e.target.value });
  };
  //-----------------------validation----------------
  const isValidateReqFields = () => {
    if (category.name.trim() === "") {
      setError("Category is required");
      return false;
    }
    // Check if category already exists (case-insensitive)
    const isDuplicate = categories.some((item) => {
      if (item.name.toLowerCase() === category.name.toLowerCase().trim()) {
        setError("Category already exists");
        return true; // Stops iteration immediately
      }
      return false;
    });
    if (isDuplicate === true) return false; // Prevents adding a duplicate category

    return true;
  };

  //---------------------------for add category-----------------------
  const handleAddcategory = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    //remove all prev error
    setError("");
    //validation
    if (isValidateReqFields() === false) {
      return;
    }
    const categoryId = uuidv4(); // Generate unique ID
    // Note- updating state and fetching setstate values using setstate in the same render then it
    // will not instantly update so fetch stored state value in temp variable, access that temp variable in the
    // function and use setState for that state only at one time within that function
    const tempCategory = {
      ...category,
      id: categoryId,
      name: category.name.trim(),
    };
    setCategories([...categories, { ...tempCategory }]); //with unique id

    setCategory({
      id: "",
      name: "",
    });
    // close the modal
    setisopen(false);
  };
  //   ------------------------for category adding end ---------------------

  return (
    <form onSubmit={handleAddcategory}>
      {/* Modal - Conditionally Rendered */}
      {isopen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 m-1 z-[11] ">
          <div className="bg-white p-6 rounded-lg shadow-lg  lg:w-[560px]">
            <h3 className="text-2xl leading-[28.15px] mb-6 text-mytextblack font-myFontWorksans font-semibold">
              Add category
            </h3>

            <div className="form-control">
              <label className="label">
                <span className="label-text text-mytextblack font-myFontWorksans font-normal">
                  Category name *
                </span>
              </label>
              <input
                type="text"
                className="input border-solid border-myinputborder w-full focus:outline-none h-[40px] font-myFontWorksans font-normal"
                name="name"
                autoFocus
                value={category.name}
                onChange={handleInput}
              />
            </div>

            <div className="flex justify-end gap-[10px] mt-6">
              <button
                className="btn w-[120px] h-[42px] text-primary bg-secondary text-base font-myFontWorksans font-semibold"
                onClick={() => {
                  setCategory({
                    id: "",
                    name: "",
                  });
                  setError("");
                  // close the modal
                  setisopen(false);
                }}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="btn w-[120px] h-[42px] text-mywhite bg-primary hover:bg-primary-light hover:text-primary text-base font-myFontWorksans font-semibold"
              >
                Save
              </button>
            </div>
            {error && <div className="mt-2 text-[#EE2A2A]">{error}</div>}
          </div>
        </div>
      )}
    </form>
  );
};

export default AddCategoryModal;
