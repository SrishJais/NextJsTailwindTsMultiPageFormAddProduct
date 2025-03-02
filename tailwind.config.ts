import type { Config } from "tailwindcss";
//import daisyui library/plugin
import daisyui from "daisyui";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {

      colors: {
        primary: {
          DEFAULT: '#1F8CD0', // main color
          medium:"#DAEDF9",
          light: '#ECF7FF',   // light version
        },
        secondary: {
          DEFAULT: '#E1E7EB', // main color
        },
        mywhite:"#FFFFFF",
        myborder:"#00000014",
        myinputborder:"#0000002E",
        mygrey:{
          DEFAULT: "#808080", // main color
          light: '#8C8C8C',   // light version
        },
        mytextblack:"#000000",
      },
      fontFamily: {
        myFontWorksans: ["var(--worksans)"],//access that variable property in var(--variable_name)
      },
    },
  },
  
  plugins: [
    //add daisyui plugin
    daisyui,

  ],
} satisfies Config;
