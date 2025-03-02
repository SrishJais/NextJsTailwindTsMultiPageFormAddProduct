"use client";
import React, { useState, useEffect, useRef } from "react";
import Tagify from "@yaireo/tagify";
import "@yaireo/tagify/dist/tagify.css"; // Import Tagify styles
import "../css/TagsInput.css";

const TagsInput = ({
  value,
  onChange,
  err,
}: {
  value: string[];
  onChange: (newValues: string[]) => void;
  err?: { option?: string; values?: string };
}) => {
  const [tags, setTags] = useState(value.join(", ")); // Initialize with passed value
  const inputRef = useRef<HTMLInputElement>(null); // Define the inputRef correctly

  useEffect(() => {
    if (inputRef.current) {
      const tagify = new Tagify(inputRef.current, {
        whitelist: [],
        dropdown: {
          enabled: 1, // Show suggestions dropdown
        },
      });

      tagify.on("change", (e) => {
        try {
          const parsedTags = JSON.parse(e.detail.value); // Parse the JSON value
          const newTags = parsedTags.map((tag: { value: string }) => tag.value); // Extract values
          setTags(newTags.join(", "));
          onChange(newTags);
        } catch (error) {
          console.error("Error parsing Tagify data:", error);
          onChange([]); // Ensure fallback in case of error
        }
      });

      return () => {
        tagify.destroy();
      };
    }
  }, [onChange, err]);

  return (
    <div className="flex items-center justify-center gap-3">
      <div>
        <label className="block"></label>
        <input
          type="text"
          className={`input text-sm border-solid w-[280px] focus:outline-none h-[40px] text-mytextblack font-myFontWorksans font-normal
            ${err?.values ? "border-[#EE2A2A]" : "border-myinputborder"}`}
          name="tags"
          defaultValue={tags} // Use defaultValue instead of value for uncontrolled input
          ref={inputRef} // Correctly reference inputRef
        />

        {(err?.option || err?.values) && (
          <div className="mt-1 h-[15px]">
            {err?.values && (
              <p className="text-[#EE2A2A] text-xs font-myFontWorksans font-normal">
                {err.values}
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default TagsInput;
