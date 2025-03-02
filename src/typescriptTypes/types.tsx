// Note- type declaration is done for all objects

import { Dispatch, SetStateAction } from "react";

// ============================================== Product obj=====================================================

// Define type for an Product obj of products (arr of objects)
export type Variant = {
  name: string;
  values: string[];
};
// -----for combinatons start----
export type Combination = {
  name: string;
  sku: string;
  quantity: number | null;
  inStock: boolean;
};

// Define Restrict specific Keys a,b,c,d for the combination object
// Note- only these set of keys is req
export type CombinationObj = {
  a: Combination;
  b: Combination;
  c: Combination;
  d: Combination;
};

// const [productCombinationsData, setProductCombinationsData] = useState<CombinationObj>({
//   "a": { name: "M/Black", sku: "", quantity:null, inStock: false },
//   "b": { name: "M/Red", sku: "", quantity:null, inStock: false },
//   "c": { name: "L/Black", sku: "", quantity:null, inStock: false },
//   "d": { name: "L/Red", sku: "", quantity:null, inStock: false },
// });

// -----for combinatons end-----

export type Discount = {
  method: "pct" | "flat"; // union is used also when we want the property of an obj should be from the given set of values only
  value: number;
};

//Keep property optional bz propertities are taken accross diff pages in a single obj
export type Product = {
  name: string;
  category: string;
  brand: string;
  image: string;
  variants: Variant[];
  combinations: CombinationObj; // Now only a, b, c, d are allowed
  priceInr: number;
  discount: Discount;
};
//to store few properties based on the properties present accross diff pages so other properties can be optional based on pages
export type tempProduct = {
  name?: string;
  category?: string;
  brand?: string;
  image?: string;
  variants?: Variant[];
  combinations?: CombinationObj; // Now only a, b, c, d are allowed
  priceInr?: number;
  discount?: Discount;
};
// ==============================================Category obj=====================================================
// Define type for an Category obj
export type Category = {
  id: string;
  name: string;
};
// ===================================Custom props type(for passing props to any component)========================

//Note-Props type are req in subcomp function parameter
// ---Props for context api
export type ProductsContextProps = {
  products: Product[]; //array of obj type Product like int[] means array of integer datatype
  setProducts: Dispatch<SetStateAction<Product[]>>;
};
export type CategoriesContextProps = {
  categories: Category[];
  setCategories: Dispatch<SetStateAction<Category[]>>;
};
//an obj
export type TempProductObjContextProps = {
  tempProductObj: tempProduct | null; //as obj
  setTempProductObj: Dispatch<SetStateAction<tempProduct | null>>; //as obj
};

export type ModalProps = {
  isopen: boolean;
  setisopen: Dispatch<SetStateAction<boolean>>;
};
