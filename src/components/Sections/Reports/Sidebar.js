"use client";

import { useEffect, useState } from "react";
import TextDropdown from "@/components/Inputs/TextDropdown";
import { defaultOption, freeOptions, options } from "@/Constants/CompanyOptions";

export default function Sidebar({
  selectedLink,
  setSelectedLink,
  data,
  handleDropdownChange,
  inputValue,
  setInputValue
}) {
  const [dropdownValue, setDropdownValue] = useState(defaultOption);

  useEffect(() => {
    if (!dropdownValue && dropdownValue?.length < 3) {
      console.log("Insuffiencent data");
    } else {
      console.log("HANDLE SEARCH");
      function isAnyStringMatching(stringsArray, targetString) {
        return stringsArray.some((string) => string == targetString);
      }
      if (!isAnyStringMatching(freeOptions, dropdownValue)) {
        if (dropdownValue) console.log("Invalid Input" + dropdownValue);
        return;
      }
      const dropdown = dropdownValue?.split(", ").pop();
      handleDropdownChange(dropdown);
    }
  }, [dropdownValue]);
  
  return (
    <div className="flex flex-[.3] flex-col gap-1 overflow-y-auto max-w-fit">
      <TextDropdown
        options={options}
        availableOptions={freeOptions}
        onSelect={setDropdownValue}
        
        inputValue={inputValue}
        setInputValue={setInputValue}
      />
      {data?.map((v, i) => {
        return (
          <div key={v.id} className="flex flex-col gap-1 my-3">
            <h6 className="font-bold text-base  text-[#323A46] leading-6	-tracking-2">
              {v.title}
            </h6>
            {v.paragraphs.map((k, j) => {
              return (
                <div
                  key={k.id}
                  onClick={() => {
                    setSelectedLink({ id: k.id, parentId: v.id, data: k });
                    const element = document.getElementById(`${k.id}`);
                    if (element) {
                      element.scrollIntoView({ behavior: "smooth" });
                    }
                  }}
                  className={`flex flex-col ml-5 cursor-pointer hover:underline hover:text-primary ${
                    selectedLink?.id === k.id &&
                    selectedLink?.parentId === k.parentId
                      ? "underline text-primary"
                      : ""
                  }`}
                >
                  <p
                    className={`${
                      selectedLink?.id === k.id
                        ? "underline text-primary"
                        : "text-gray-700"
                    } font-medium  text-base hover:text-primary leading-6 -tracking-2`}
                  >
                    {k.text}
                  </p>
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
}
