//context api only can be used in client component and context only be provided frm the client component
//Note - If context api is made in layout of app folder then the whole application while become client application only
"use client";
//1.import context
import { createContext, useState } from "react";
//import the types for obj 
import { Product,Category, ProductsContextProps, TempProductObjContextProps, CategoriesContextProps, tempProduct } from '@/typescriptTypes/types';

//------------------------------------Define the context type end here -------------------------------------------------

//2.create context (for data(state and setstate passed enclosing within as obj ))
// Note- We know we will always provide value in context .But ,If a component mistakenly uses useContext() 
// outside the provider without being wrapped inside the provider, it would receive null. This allows you to 
// catch errors early instead of silently accessing an empty object.

//Note-context variable is an obj like context={passedProps} so we use {{state,setState}} while passing
//ProductsContextProps obj has both state and setstate function wrapped
export const ProductsContext = createContext<ProductsContextProps | null>(null);
export const CategoriesContext = createContext<CategoriesContextProps | null>(null);
export const TempProductObjContext = createContext<TempProductObjContextProps | null>(null);

//------------------------------------create context end here---------------------------------------------------------


// ---------------------------------function start ------------------------------ 
const RootContext = ({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) => {

//3. Global data (passed to provider)
const [products, setProducts] = useState<Product[]>([]);
const [categories, setCategories] = useState<Category[]>([]);
const [tempProductObj, setTempProductObj] = useState<tempProduct|null>(null);


//4.provide data (for getting/accessing passed value to different child components)
  return (
    <ProductsContext.Provider value={{ products, setProducts }}>
    <CategoriesContext.Provider value={{ categories, setCategories }}>
    <TempProductObjContext.Provider value={{ tempProductObj, setTempProductObj }}>

        {children}
    </TempProductObjContext.Provider>
    </CategoriesContext.Provider>

    </ProductsContext.Provider>
  )
}

export default RootContext;