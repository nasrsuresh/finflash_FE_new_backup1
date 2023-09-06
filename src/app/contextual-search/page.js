"use client";
import ButtonGroup from "@/components/Buttons/ButtonGroup";
import Header from "@/components/Header";
import ContextualHeader from "@/components/Sections/Contextual/ContextualHeader";
import InitialSearchResult from "@/components/Sections/Contextual/InitialSearchResult";
import InputContainer from "@/components/Sections/Contextual/InputContainer";
import { useEffect, useState } from "react";
import { faker } from "@faker-js/faker";
import DataSelected from "@/components/Sections/Contextual/DataSelected";
import ANIME from "@/components/Sections/Contextual/ANIME";//Anime

import {
  GET_ALL_SENTENCES_URL_CONCALL,
  LINK_10K_URL,
  SEARCH_URL,
  SEARCH_URL_CONCALL,
  SET_INDEX_KEY_URL,
  SET_INDEX_KEY_URL_CONCALL,
} from "@/Constants";
import Head from "next/head";
import { defaultOption, freeOptions, options } from "@/Constants/CompanyOptions";
import { usePathname, useRouter } from "next/navigation";
import Loader from "@/components/Loader";



// Create a nested array
const nestedArray = [];

for (let i = 0; i < 10; i++) {
  const innerArray = [];
  const numParagraphs = Math.floor(Math.random() * (10 - 7 + 1)) + 7; // Generating 7 to 10 paragraphs

  for (let j = 0; j < numParagraphs; j++) {
    const paragraph = faker.lorem.paragraph();
    innerArray.push(paragraph);
  }

  nestedArray.push(innerArray);
}
export default function ContextualSeach({ href }) {
  const [showAnime, setShowAnime] = useState(true);
  useEffect(() => {
    const animeTimer = setTimeout(() => {
      setShowAnime(false);
    }, 40000); // 20 seconds in milliseconds

    return () => {
      clearTimeout(animeTimer);
    };
  }, []);
  const router = useRouter();
  const pathname = usePathname();
  const [searchData, setSearchData] = useState(false);
  const [showDetailsCard, setShowDetailsCard] = useState(false);
  const [dataSelected, setDataSelected] = useState(false);
  const [sourceName, setSourceName] = useState("");
  const buttons = ["10K", "Transcripts"];
  const [selectedButton, setSelectedButton] = useState(buttons[0]);
  const [searchTerm, setSearchTerm] = useState("");
  const [dropdownTerm, setDropdownTerm] = useState("");
  const [fullDoc, setFullDoc] = useState("");
  const [searchInputText, setSearchInputText] = useState("");
  const [dropdownInputText, setDropdownInputText] = useState();
  const [loading, setLoading] = useState(false);
  const [inputValue, setInputValue] = useState(defaultOption)
  function checkCurrentPath() {
    console.log("Back button pressed!");
    if (dataSelected && location?.hash.length > 3) {
      console.log(showDetailsCard, "cards details");
      requestAnimationFrame(() => setShowDetailsCard(true));
    } else {
      requestAnimationFrame(() => {
        setDataSelected(false);
        setShowDetailsCard(false)
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
    setDataSelected(false);
    setSearchData(false);
    // setSearchTerm("");
    // setDropdownTerm("");
    setSourceName("loading...")
    setFullDoc("");
    if(!selectedButton)setSelectedButton(buttons[0])
    // eslint-disable-next-line react-hooks/exhaustive-deps
    if (dropdownInputText && searchInputText)
      handleSearch(searchInputText, dropdownTerm);
  }, [selectedButton]);
  function isAnyStringMatching(stringsArray, targetString) {
    return stringsArray.some((string) => string == targetString);
  }
  const handleSearch = (search, dropdown) => {
    console.log("HANDLE SEARCH");
    setLoading(true);
    setFullDoc("");

    if (
      !isAnyStringMatching(freeOptions, dropdown) ||
      search.length < 3 ||
      dropdown.length < 3
    ) {
      alert("Invalid Input");
      return;
    }
    setDropdownTerm(dropdown);
    setSearchTerm(search);

    dropdown = dropdown.split(", ")[dropdown.split(", ").length - 1];

    if (selectedButton == buttons[0]) {
      fetch(SET_INDEX_KEY_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ symbol: dropdown }),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          const sName = data?.message?.substr(
            18,
            data?.message?.indexOf(".") - 18
          );
          console.log(data.message);

          fetch(SEARCH_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ query: search, userid: "" }),
          })
            .then((response) => response.json())
            .then((data) => {
              const sortedData = data.results;
              const consecutiveSentences = [];
              for (let i = 0; i < sortedData.length; i += 5) {
                var temp = [];
                for (let j = 0; j < 5; j++) {
                  const element = sortedData[i + j];
                  temp.push(element);
                }
                consecutiveSentences.push(temp);
              }
              console.log(consecutiveSentences, "conscetu");
              setSearchData(consecutiveSentences || []);
            })
            .catch((error) => console.error("Error:", error));
            fetch(LINK_10K_URL, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ symbol: dropdown }),
            })
            .then((response) => response.json())
            .then((data) => {
              console.log(data?.html_content?.length, "html_content");
              setSourceName(data?.Source || "source not in api");
              setFullDoc(
                data?.html_content.replace(/<img[^>]*>/g, '')
                // ?.replace(
                //   /<img([^>]+)src="([^"]+)"/g,
                //   (match, attributes, oldSrc) => {
                //     try {
                //       const newSrc = new URL(oldSrc, data)?.href;
                //       return `<img${attributes}src="${newSrc}"`;

                //     } catch (error) {
                //       console.log(error, "image error");
                //     }
                //   }
                // )
              );
            })
            .catch((error) => console.error("Error:", error));
          fetch(SEARCH_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ query: search }),
          })
            .then((response) => response.json())
            .then((data) => {
              const sortedData = data.results;
              const consecutiveSentences = [];
              for (let i = 0; i < sortedData.length; i += 5) {
                var temp = [];
                for (let j = 0; j < 5; j++) {
                  const element = sortedData[i + j];
                  temp.push(element);
                }
                consecutiveSentences.push(temp);
              }
              console.log(consecutiveSentences, "conscetu");
              setSearchData(consecutiveSentences || []);
              setLoading(false);
            })
            .catch((error) => console.error("Error:", error));
        })
        .catch((error) => console.error("Error In SET_INDEX_KEY:", error));
    } else {
      fetch(SET_INDEX_KEY_URL_CONCALL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ symbol: dropdown }),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          
          fetch(GET_ALL_SENTENCES_URL_CONCALL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ symbol: dropdown }),
          })
          .then((response) => response.json())
          .then((data) => {
            let sentences = "";
            setSourceName(data?.Source || "source not in api");
              data?.result?.forEach((sentence) => {
                sentences += "<div>" + sentence["Sentence"] + "</div>";
              });
              sentences += "";
              console.log("transcript full data", data);
              setFullDoc(sentences);
              setLoading(false);
            });
          fetch(SEARCH_URL_CONCALL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ query: search }),
          })
            .then((response) => response.json())
            .then((data) => {
              const sortedData = data.results;
              const consecutiveSentences = [];
              for (let i = 0; i < sortedData.length; i += 5) {
                var temp = [];
                for (let j = 0; j < 5; j++) {
                  const element = sortedData[i + j];
                  temp.push(element);
                }
                consecutiveSentences.push(temp);
              }
              console.log(consecutiveSentences);
              setSearchData(consecutiveSentences || []);
            })
            .catch((error) => console.error("Error:", error));
        })
        .catch((error) => console.error("Error In SET_INDEX_KEY:", error));
    }
  };

  return (
    <main className="h-[100vh] bg-[#F7F8F9]">
      <Header />
      <div className="w-100 h-[92vh] p-8">
        {!dataSelected && (
          <div className="mt-3">
            <ContextualHeader
            inputValue={inputValue} setInputValue={setInputValue}
              onSearch={handleSearch}
              dropdownInputText={dropdownInputText}
              setDropdownInputText={setDropdownInputText}
              searchInputText={searchInputText}
              setSearchInputText={setSearchInputText}
            />
          </div>
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
        {/* {loading ? ( */}

        {!loading ? (
          Boolean(searchData) ? (
            <div className="my-5">
              {Boolean(dataSelected && showDetailsCard) ? (
                <DataSelected
                  data={searchData}
                  sourceName={sourceName}
                  label={`Search results for ${searchTerm} for ${dropdownTerm} Showing ${searchData?.length} results`}
                  fullDoc={fullDoc}
                />
              ) : (
                <InitialSearchResult
                  data={searchData || []}
                  onDataSelect={setDataSelected}
                  sourceName={sourceName}
                  label={`Search results for ${searchTerm} for ${dropdownTerm} Showing ${searchData?.length} results`}
                />
              )}
            </div>
          ) : showAnime ? (
            <div className="my-5" style={{ padding: 0, margin: 0 }}>
              <ANIME />
            </div>
          ) : (
            <div className="my-5">
              <InputContainer />
            </div>
          )
        ) : (
          <Loader />
        )}
        

        {Boolean(dataSelected && showDetailsCard) && (
          <div className="flex items-center justify-end">
            <button
              className="border p-3 text-blue-500 rounded-md"
              onClick={() => {
                // setSearchData(false);
                setDataSelected(false);
                router.back();
              }}
            >
              Back to Contextual Search
            </button>
          </div>
        )}
      </div>
    </main>
  );
}
