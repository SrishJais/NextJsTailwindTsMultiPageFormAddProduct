import Drawer from "@/components/Drawer";
import "./globals.css";
import RootContext from "@/context/RootContext";
//import font
import { Work_Sans } from "next/font/google";

//obj for font
const worksans = Work_Sans({
  variable: "--worksans", //variable for className
  display: "swap", //show test even if font not loaded
  subsets: ["latin"], //mandatory
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      {/*5. ----------------------Wrap the children where we can use the provided data -------------------- */}
      <RootContext>
        <body className={worksans.variable}>
          <div
          // className="flex"
          >
            {/* -----drawer-----  */}
            <div>
              {/* children cannot be passed as props  */}
              <Drawer>{children}</Drawer>
            </div>
          </div>
        </body>
      </RootContext>
    </html>
  );
}
