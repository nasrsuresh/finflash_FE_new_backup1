import React, { useState, useRef, useEffect } from "react";
import { Inter } from "next/font/google";
import LOCK_ICON from "@/../public/assets/Icons/lock-solid.svg";
import Image from "next/image";
import { defaultOption } from "@/Constants/CompanyOptions";
const inter = Inter({ weight: ["500", "700"], subsets: ["latin"] });

const TextDropdown = ({
  options,
  onSelect,
  availableOptions,
  inputValue,
  setInputValue,
}) => {
  const [filteredOptions, setFilteredOptions] = useState(options);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const inputRef = useRef(null);

  const handleInputChange = (event) => {
    const newInputValue = event.target.value;
    const newFilteredOptions = options.filter((option) =>
      option.toLowerCase().includes(newInputValue.toLowerCase())
    );

    setInputValue(newInputValue);
    setFilteredOptions(newFilteredOptions);
    setDropdownVisible(true);
  };

  const handleOptionSelect = (option) => {
    setInputValue(option);
    setFilteredOptions(options);
    setDropdownVisible(false);
  };

  const handleInputBlur = () => {
    if (filteredOptions.length == 0) {
      setInputValue(JSON.stringify(filteredOptions));
    }
    setTimeout(() => {
      if (!inputRef?.current?.contains(document.activeElement)) {
        setDropdownVisible(false);
      }
    }, 0);
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleInputBlur);
    return () => {
      document.removeEventListener("mousedown", handleInputBlur);
    };
  }, []);
  useEffect(() => {
    onSelect(inputValue);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inputValue]);
  return (
    <div
      className={`h-12 relative inline-block text-left ${inter.className} w-[350px] font-bold shadow-md max-w-full`}
      ref={inputRef}
    >
      <input
        type="text"
        className="w-full text-black h-12 px-4 py-2 pr-8 rounded bg-[#F7F8F9] border border-primary outline-none"
        placeholder="Search for symbol or company"
        value={inputValue}
        onChange={handleInputChange}
        onFocus={() => setDropdownVisible(true)}
      />
      {dropdownVisible && (
        <ul
          className="absolute z-10 w-full mt-2 bg-white text-black border border-gray-300 rounded shadow-md"
          style={{ height: "400px", overflow: "auto" }}
        >
          {filteredOptions?.map((option) => {
            const locked = !availableOptions.includes(option);
            return (
              <li
                key={option}
                className="cursor-pointer text-black hover:bg-gray-100"
              >
                <button
                  className="w-full py-2 px-4 disabled:opacity-20"
                  onClick={(e, i) => {
                    handleOptionSelect(option);
                  }}
                  disabled={locked} // Disable blocked options
                >
                  <p className="w-full text-left flex justify-between items-center">
                    <span>{option}</span>
                    {locked && (
                      <span>
                        {
                          <Image
                            src={LOCK_ICON}
                            alt={"lock"}
                            width={8}
                            height={8}
                          />
                        }
                      </span>
                    )}
                  </p>
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default TextDropdown;
