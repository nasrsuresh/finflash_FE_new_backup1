"use client";
import CompanyOptions, { freeOptions, options } from "@/Constants/CompanyOptions";
import ResearchSearchBar from "@/components/Inputs/ResearchSearchbar";
import TextDropdown from "@/components/Inputs/TextDropdown";
import { useState } from "react";



const ContextualHeader = ({ onSearch, setSearchInputText, searchInputText, setDropdownInputText, dropdownInputText, inputValue, setInputValue }) => {
  const handleSearch = (e) => {
    onSearch(e, dropdownInputText);
  };
  // console.log(dropdownValue);
  return (
    <div className="flex flex-col md:flex-row items-center gap-4">
      <TextDropdown options={options} availableOptions={freeOptions} onSelect={setDropdownInputText} inputValue={inputValue} setInputValue={setInputValue} />
      <ResearchSearchBar
        btnClassName="shadow-lg"
        inputClassName="text-black font-bold shadow-lg"
        placeholder="Search for phrase or word to get relevant snippet"
        onSubmit={handleSearch}
        setSearchInputText={setSearchInputText}
        searchInputText={searchInputText}
      />
    </div>
  );
};

export default ContextualHeader;
