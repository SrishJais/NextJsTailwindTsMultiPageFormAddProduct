"use client";
import "../css/drawer.css";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { MdOutlineMenu } from "react-icons/md";
import DrawerProfileImg from "../../public/assets/photos/profile.png";

const Drawer = ({ children }: { children: React.ReactNode }) => {
  const currpathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const navMenuItems = [
    { name: "Home", path: "/" },
    { name: "Stores", path: "/stores" },
    { name: "Products", path: "/products" },
    { name: "Catalogue", path: "/catalogue" },
    { name: "Promotions", path: "/promotions" },
    { name: "Reports", path: "/reports" },
    { name: "Docs", path: "/docs" },
    { name: "Settings", path: "/settings" },
  ];

  return (
    <div className="flex">
      {/* ================================================Sidebar Drawer====================================================== */}
      <div className="relative z-[5]">
        <div
          className={`fixed lg:relative top-0 left-0 h-full w-[250px] bg-white border-r border-myborder px-4 py-6 transition-transform 
           overflow-auto
            ${
              isOpen ? "translate-x-0" : "-translate-x-full"
            } lg:translate-x-0 lg:w-[320px] lg:h-[100vh] flex flex-col justify-between shadow-lg lg:shadow-none z-40`}
        >
          <div>
            {/* Header */}
            <header className="border-b border-myborder pb-4 mb-4">
              {/* <div className=" relative w-[116px] h-[48px] "> */}
              <Image
                src="/assets/photos/logo.png"
                alt="logo"
                width={116} // Explicit size
                height={48}
                priority // Preloads the image for faster loading
              />
              {/* </div> */}
            </header>

            {/* Navigation Menu */}
            <nav className="my-2">
              {navMenuItems.map((item) => (
                <Link
                  href={item.path}
                  key={item.name}
                  className={`pl-4 py-2 my-2 flex items-center ${
                    currpathname === item.path ||
                    (item.name === "Products" &&
                      (currpathname === "/products/addproduct/description" ||
                        currpathname === "/products/addproduct/variants" ||
                        currpathname === "/products/addproduct/combinations" ||
                        currpathname === "/products/addproduct/priceinfo"))
                      ? "myActiveMenuClass"
                      : ""
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  <div className=" relative w-[20px] h-[20px] ">
                    <Image
                      src="/assets/icons/menuIcon.svg"
                      alt="menu"
                      fill
                      sizes="20px" //for width mandatory with fill
                    />
                  </div>
                  <span className="text-sm ml-2 font-myFontWorksans font-medium">
                    {item.name}
                  </span>
                </Link>
              ))}
            </nav>
          </div>

          {/* Footer */}
          <footer className="border-t border-myborder pt-4 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className=" relative h-[40px] w-[40px]">
                <div className=" relative w-[40px] h-[40px] ">
                  <Image
                    src={DrawerProfileImg}
                    alt="profile"
                    fill
                    sizes="40px" //for width mandatory with fill
                  />
                </div>
              </div>
              <div>
                <p className="text-sm text-gray-900 font-myFontWorksans font-medium">
                  Andy Samberg
                </p>
                <p className="text-xs text-gray-500 font-myFontWorksans font-medium">
                  andy.samberg@gmail.com
                </p>
              </div>
            </div>

            <div className=" relative w-[20px] h-[20px] ">
              <Image
                src="/assets/icons/footerIcon.svg"
                alt="menu"
                fill
                sizes="20px" //for width mandatory with fill
              />
            </div>
          </footer>
        </div>

        {/* Overlay for Mobile */}
        {isOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-40 lg:hidden"
            onClick={() => setIsOpen(false)}
          />
        )}
      </div>

      {/* ===================================================Navbar & Pages=============================================== */}
      <div className="w-full">
        {/* Navbar */}
        <div className="lg:hidden flex justify-end bg-white sticky top-0">
          {/* -----toggle btn ------ */}
          <button
            className="lg:hidden p-3 px-4 rounded-full active:shadow-lg"
            onClick={() => setIsOpen(!isOpen)}
          >
            <MdOutlineMenu className="text-3xl" />
          </button>
        </div>
        <div className="px-5 pb-4 ">
          {/* Render Pages */}
          {children}
        </div>
      </div>
    </div>
  );
};

export default Drawer;
