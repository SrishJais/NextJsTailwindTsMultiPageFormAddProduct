"use client";
import "../../../css/addproduct.css";
//for menu
import Link from "next/link";

//for active class in nav menu
import { usePathname } from "next/navigation";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  //for active class in menu
  const currpathname = usePathname();

  //add product menu items
  const addProductmenuItems = [
    {
      name: "Description",
      path: "/products/addproduct/description",
    },
    {
      name: "Variants",
      path: "/products/addproduct/variants",
    },
    {
      name: "Combinations",
      path: "/products/addproduct/combinations",
    },
    {
      name: "Price info",
      path: "/products/addproduct/priceinfo",
    },
  ];
  // active index
  const activeIndex = addProductmenuItems
    .map((item) => item.path)
    .indexOf(currpathname);

  return (
    <div className="mb-4">
      <h6 className="text-2xl my-5 font-myFontWorksans font-semibold">
        Add product
      </h6>
      <div
        className="flex justify-center
       "
      >
        <div className=" w-[100%] flex justify-center items-center flex-col">
          {/* add product menu navbar */}
          <nav className="breadcrumbs text-sm pt-1">
            <ul>
              {addProductmenuItems.map((item, index) => {
                return (
                  <li key={item.name} className={"pb-2 flex gap-[10px]"}>
                    <Link
                      href={item.path}
                      className={` 
                   text-mygrey ${
                     currpathname === item.path ||
                     //  all the previous munu items should be highlighted
                     (currpathname !== item.path && index <= activeIndex)
                       ? "myActiveBreadcrumbsClass"
                       : ""
                   }
                  `}
                    >
                      <div className="w-[105px] h-[26px] rounded-lg flex justify-center items-center ">
                        <span className="text-sm font-myFontWorksans font-medium">
                          {item.name}
                        </span>
                      </div>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
          {/* addproduct navbar menu all pages content  */}
          {children}
        </div>
      </div>
    </div>
  );
}
