/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import Header from "@/components/Header";
import TextDropdown from "@/components/Inputs/TextDropdown";
import DataSelected from "@/components/Sections/Contextual/DataSelected";
import InitialSearchResult from "@/components/Sections/Contextual/InitialSearchResult";
import { useEffect, useState } from "react";
import { faker } from "@faker-js/faker";
import ButtonGroup from "@/components/Buttons/ButtonGroup";
import InputContainer from "@/components/Sections/Contextual/InputContainer";
import {
  defaultOption,
  freeOptions,
  options,
} from "@/Constants/CompanyOptions";
import {
  GET_ALL_SENTENCES_URL_CONCALL_NEGATIVE,
  SET_SYMBOL_KEY_NEGATIVE_10K_URL,
  SET_SYMBOL_KEY_NEGATIVE_CONCALL_URL,
  LINK_10K_URL,
} from "@/Constants";
import Loader from "@/components/Loader";

export default function KeyNegatives() {
  const [dropdownValue, setDropdownValue] = useState(defaultOption);
  const [dropdownTerm, setDropdownTerm] = useState("");
  const [searchData, setSearchData] = useState(null);
  const [dataSelected, setDataSelected] = useState(false);
  const [fullDoc, setFullDoc] = useState("");
  const [sourceName, setSourceName] = useState("");
  const [loading, setLoading] = useState(false);
  const [showDetailsCard, setShowDetailsCard] = useState(false);
  const [inputValue, setInputValue] = useState(defaultOption);

  const buttons = [
    "Key negative statements from transcripts",
    "Key critical statements from 10K",
  ];
  const [selectedButton, setSelectedButton] = useState(buttons[0]);
  function checkCurrentPath() {
    console.log("Back button pressed!");
    if (dataSelected && location?.hash.length > 3) {
      console.log(showDetailsCard, "cards details");
      requestAnimationFrame(() => setShowDetailsCard(true));
    } else {
      requestAnimationFrame(() => {
        setDataSelected(false);
        setShowDetailsCard(false);
      });
    }
    // Add your code here
  }

  typeof window !== "undefined" &&
    window?.addEventListener("popstate", checkCurrentPath);
  // Add an event listener to the popstate event
  useEffect(() => {
    if (dataSelected) setShowDetailsCard(true);
    return (
      typeof window !== "undefined" &&
      window?.removeEventListener("popstate", checkCurrentPath)
    );
  }, [dataSelected]);
  useEffect(() => {

    if (!dropdownValue && dropdownValue?.length < 3) {
      console.log("Insuffiencent data");
    } else {
      console.log("HANDLE SEARCH");
      function isAnyStringMatching(stringsArray, targetString) {
        return stringsArray.some((string) => string == targetString);
      }
      if (!isAnyStringMatching(freeOptions, dropdownValue)) {
        // if (dropdownValue) alert("Invalid Input" + dropdownValue);
        console.log("Invalid", dropdownValue, selectedButton);
        return;
      }
      const dropdown = dropdownValue?.split(", ").pop();
      if (selectedButton) {
        setFullDoc("")
        setSourceName("loading...")
        setLoading(true);
        setDropdownTerm(dropdownValue);
        if (selectedButton == buttons[0]) {
          setDataSelected("");
          setSourceName("");
          fetch(SET_SYMBOL_KEY_NEGATIVE_CONCALL_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ symbol: dropdown }),
          })
            .then((response) => response.json())
            .then((data) => {
              // console.log(data);
              const sortedData = data.result;
              const consecutiveSentences = [];
              const extractSubString = (str) => {
                return str.substr(11, str.lastIndexOf('"') - 11);
              };
              for (let i = 0; i < sortedData.length; i += 1) {
                var temp = [];
                temp.push({ "Cleaned Sentence": "" });
                temp.push({
                  "Cleaned Sentence": extractSubString(
                    sortedData[i]["previous"]
                  ),
                });
                temp.push({
                  "Cleaned Sentence": extractSubString(
                    sortedData[i]["highlighted"]
                  ),
                  Type: "similar_sentences",
                });
                temp.push({
                  "Cleaned Sentence": extractSubString(sortedData[i]["next"]),
                });
                temp.push({ "Cleaned Sentence": "" });
                setSourceName(data?.Source || "source not found");

                consecutiveSentences.push(temp);
              }
              // console.log(consecutiveSentences, "conscetu");

              setSearchData(consecutiveSentences);
              fetch(GET_ALL_SENTENCES_URL_CONCALL_NEGATIVE, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ symbol: dropdown }),
              })
                .then((response) => response.json())
                .then((data) => {
                  console.log("transcript full data", data);

                  let sentences = "";
                  data?.result?.forEach((sentence) => {
                    sentences += "<div>" + sentence["Sentence"] + "</div>";
                  });
                  sentences += "";
                  setFullDoc(sentences);
                  setLoading(false);

                  console.log(Object.keys(data));
                });
            })
            .catch((error) =>
              console.error(
                "Error In SET_SYMBOL_KEY_NEGATIVE_CONCALL_URL:",
                error
              )
            );
        } else {
          fetch(LINK_10K_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ symbol: dropdown }),
          })
            .then((response) => response.json())
            .then((html) => {
              // console.log(html);
              setSourceName(html?.Source || "source not loaded");
              setFullDoc(
                html?.html_content.replace(/<img[^>]*>/g, "")
                // .replace(
                //   /<img([^>]+)src="([^"]+)"/g,
                //   (match, attributes, oldSrc) => {
                //     const newSrc = new URL(oldSrc, data).href;
                //     return `<img${attributes}src="${newSrc}"`;
                //   }
                // )
              );
            })
            .catch((error) => console.error("Error:", error));

          fetch(SET_SYMBOL_KEY_NEGATIVE_10K_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ symbol: dropdown }),
          })
            .then((response) => response.json())
            .then((data) => {
              const sortedData = data.result;
              const consecutiveSentences = [];

              for (let i = 0; i < sortedData.length; i += 1) {
                var temp = [];
                temp.push({ "Cleaned Sentence": "" });
                temp.push({
                  "Cleaned Sentence": sortedData[i][
                    "previous_sentence"
                  ].replaceAll("\n", ": "),
                });
                temp.push({
                  "Cleaned Sentence": sortedData[i][
                    "negative_sentence"
                  ].replaceAll("\n", ": "),
                  Type: "similar_sentences",
                });
                temp.push({
                  "Cleaned Sentence": sortedData[i]["next_sentence"].replaceAll(
                    "\n",
                    ": "
                  ),
                });
                temp.push({ "Cleaned Sentence": "" });

                consecutiveSentences.push(temp);
                setLoading(false);
              }
              console.log(consecutiveSentences, "conscetu");
              setSearchData(consecutiveSentences);
            })
            .catch((error) => console.error("Error In SET_INDEX_KEY:", error));
        }
      }
    }
  }, [dropdownValue, selectedButton]);

  return (
    <main className="min-h-screen bg-[#F7F8F9]">
      <Header />

      <div className="w-100 p-8">
        <div className={"items-center w-full "}>
          {!dataSelected && (
            <TextDropdown
              inputValue={inputValue}
              setInputValue={setInputValue}
              options={options}
              availableOptions={freeOptions}
              onSelect={setDropdownValue}
            />
          )}
          {!dataSelected && (
            <div className="my-5">
              <ButtonGroup
                selectedButton={selectedButton}
                setSelectedButton={setSelectedButton}
                buttons={buttons}
              />
            </div>
          )}
        </div>
        {!loading ? (
          <>
            {Boolean(searchData) ? (
              <>
                <div className="my-3">
                  {Boolean(dataSelected && showDetailsCard) ? (
                    <DataSelected
                      data={searchData || []}
                      sourceName={sourceName}
                      fullDoc={fullDoc}
                      label={`Search results for ${dropdownTerm}  Showing ${searchData?.length} results`}
                    />
                  ) : (
                    <InitialSearchResult
                      data={searchData || []}
                      sourceName={sourceName}
                      onDataSelect={setDataSelected}
                      label={`Search results for ${dropdownTerm}  Showing ${searchData?.length} results`}
                    />
                  )}
                </div>
                {Boolean(dataSelected && showDetailsCard) && (
                  <div className="flex items-center justify-end">
                    <button
                      className="border p-3 text-blue-500 rounded-md"
                      onClick={() => {
                        setDataSelected(false);
                      }}
                    >
                      Back to Key Negatives
                    </button>
                  </div>
                )}
              </>
            ) : (
              <div className="my-3">
                <InputContainer />
              </div>
            )}
          </>
        ) : (
          <Loader />
        )}
      </div>
    </main>
  );
}
