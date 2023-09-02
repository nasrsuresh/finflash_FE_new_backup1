"use client";
import { useEffect, useRef, useState } from "react";
import { Inter } from "next/font/google";
const inter = Inter({ weight: ["500", "700"], subsets: ["latin"] });
import ResearchSearchCard from "@/components/Cards/ResearchSearchCard";
import DataCard from "@/components/Cards/DataCard";
import Loader from "@/components/Loader";

const DataSelected = ({
  data,
  onDataSelect,
  sourceName = "2022_10K report",
  label,
  fullDoc,
}) => {
  const similarPositions = [];

  data?.forEach((result) => {
    try {
      result?.forEach?.((r) => {
        if (r.Type == "similar_sentences") {
          similarPositions.push(r.Position);
        }
      });
    } catch (error) {
      console.log(error);
    }
  });
  const [cardSelected, setCardSelected] = useState(0);

  const docContainerRef = useRef();
  function highlightNestedChildren(element, searchText) {
    const found = false;
    if (element.textContent.includes(searchText)) {
      element.scrollIntoView({ behavior: "smooth" });
      console.log("scrolling to parent", searchText, element);
      element.style.backgroundColor = "yellow";
    }

    const childDivs = element.querySelectorAll("div");
    for (const childDiv of childDivs) {
      highlightNestedChildren(childDiv, searchText);
    }
  }
  function normalizeAndCompare(searchText, textToSearch) {
    // Function to remove special characters and extra spaces
    const removeSpecialCharacters = (str) =>
      str.replace(/[^\w\s]/gi, "").replace(/\s+/g, " ");

    // Normalize and remove special characters from both strings
    const normalizedSearchText = removeSpecialCharacters(
      searchText.toLowerCase()
    );
    const normalizedTextToSearch = removeSpecialCharacters(
      textToSearch.toLowerCase()
    );

    // Perform the comparison
    return normalizedTextToSearch.includes(normalizedSearchText);
  }

  function findAndHighlight(
    rootElement,
    searchText,
    stackSize = 0,
    foundInParent = false
  ) {
    const divsToSearch = rootElement?.children;
    let found = false;
    for (const div of divsToSearch) {
      if (normalizeAndCompare(searchText, div.textContent)) {
        console.log("found");
        div.scrollIntoView({ behavior: "smooth" });

        if ((div?.children?.length || -1) > 0) {
          div.style.backgroundColor = "rgba(255, 255, 0, .5)";
          console.log(div?.children);
          for (const element of div.children) {
            element.style.backgroundColor = "rgba(255, 255, 0, .5)";
            // console.log(element);
            highlightNestedChildren(element, searchText);
          }
        } else {
          highlightNestedChildren(div, searchText);
          // console.log(div);
          found = true;
          console.log("found2");
        }
        return;
      }
    }
    if (foundInParent && !found) {
      console.log("showing parent");

      highlightNestedChildren(rootElement, searchText);
    }
    if (!found && stackSize < 5) {
      console.log(
        "Not found in any parent div Now dividing the divs level",
        stackSize
      );
      let splitList = searchText.split(": ");
      if (splitList.length > 1) {
        // console.log("split using ':'", splitList);
        console.log(splitList[1], rootElement);
        for (let index = 1; index < splitList.length; index++) {
          // console.log("TRYING", splitList[index]);
          if (splitList[index] > 10)
            findAndHighlight(
              rootElement,
              splitList[splitList.length - 1],
              ++stackSize
            );
        }
      } else {
        console.log("splitting didnt work now trying to replace");
        let updatedSearch = searchText.replace(/^(?:[A-Z][a-z]*\s*)+/g, "");
        if (updatedSearch.length > 5) {
          findAndHighlight(rootElement, updatedSearch, ++stackSize);
        }
      }
    }
  }
  const goToText = (e) => {
    // console.log(data?.[e]?.[2]?.["Cleaned Sentence"]);
    // const divs = docContainerRef.current?.children; // Replace with a class that identifies your scrollable divs
    if (fullDoc.length > 100) {
      console.log(
        "initial search",
        data?.[e]?.[2]?.["Cleaned Sentence"],
        fullDoc.length
      );

      findAndHighlight(
        docContainerRef.current,
        data?.[e]?.[2]?.["Cleaned Sentence"]
      );
    }
  };
  const handleCardSelect = (e) => {
    if (e == cardSelected) goToText(e);
    setCardSelected(e);
  };
  useEffect(() => {
    goToText(cardSelected);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cardSelected]);
  return (
    <div
      className={`${inter.className} flex gap-4 px-5 py-8 w-full flex-col border  `}
    >
      <div className="w-full">
        <div className="flex-row flex justify-center gap-8">
          <p className="text-base font-bold">{label || "No label"}</p>
          <p className="text-base text-black font-bold">Source: {sourceName}</p>
        </div>
      </div>
      <div className="w-full flex flex-row gap-4 flex-1">
        <div className="flex flex-col w-[30%] max-h-[65vh] min-h-[65vh] text-black bg-white overflow-hidden overflow-y-auto">
          {data?.map((v, i) => {
            return (
              <DataCard
                data={v}
                key={i}
                index={i}
                onSelect={handleCardSelect}
                isSelected={cardSelected === i}
              />
            );
          })}
        </div>
        <div className="flex  text-black w-[70%] max-h-[65vh] min-h-[65vh] bg-white border px-5 py-8 flex-col overflow-hidden overflow-y-scroll">
          {fullDoc?.length > 100 ? (
            <div
              ref={docContainerRef}
              dangerouslySetInnerHTML={{ __html: fullDoc }}
            />
          ) : (
            <Loader />
          )}
        </div>
      </div>
    </div>
  );
};

export default DataSelected;
