"use client";
import Header from "@/components/Header";
import ReportContent from "@/components/Sections/Reports/ReportContent";
import Sidebar from "@/components/Sections/Reports/Sidebar";
import { useEffect, useState } from "react";
import { faker } from "@faker-js/faker";
import {
  COMPANY_DATA_URL,
  COMPANY_OTHER_INFO_URL,
  STOCK_DATA_URL,
} from "@/Constants";
import Loader from "@/components/Loader";
import { defaultOption } from "@/Constants/CompanyOptions";

function formatNumber(number) {
  const ranges = [
    { divider: 1e12, suffix: "T" },
    { divider: 1e9, suffix: "B" },
    { divider: 1e6, suffix: "M" },
    { divider: 1e3, suffix: "K" },
  ];

  for (const range of ranges) {
    if (number >= range.divider) {
      return (
        (number / range.divider).toFixed(1).replace(/\.0$/, "") + range.suffix
      );
    }
  }

  return number.toString();
}
export default function FlashReport() {
  const [selectedLink, setSelectedLink] = useState(null);
  const [graphData, setGraphData] = useState(null);
  const [companyData, setCompanyData] = useState(null);
  const [otherData, setOtherData] = useState(null);
  const [selectedGraphOption, setSelectedGraphOption] = useState(0);
  const [dropdownValue, setDropdownValue] = useState(defaultOption);
  const graphOptions = ["1_month", "1_year", "5_year"];
  const [loading, setLoading] = useState(false);
  const [inputValue, setInputValue] = useState(defaultOption);

  const getStockData = (dropdown, period = "1_month") => {
    fetch(STOCK_DATA_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        symbol: dropdown,
        period: graphOptions[selectedGraphOption],
      }),
    })
      .then((response) => {
        console.log(response);
        return response.json();
      })
      .then((data) => {
        function formatDate(inputDate, period) {
          const months = [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Aug",
            "Sep",
            "Oct",
            "Nov",
            "Dec",
          ];

          const parts = inputDate.split("-");
          const year = parts[0];
          const month = months[parseInt(parts[1]) - 1];
          const day = parts[2];

          if (period == "5_year") return inputDate;
          return `${month}-${day}`;
        }
        const stock_data = [];
        data?.stock_price_data?.forEach((e) =>
          stock_data.push({
            name: formatDate(e.date, graphOptions[selectedGraphOption]),
            pv: e.close_price,
          })
        );
        // console.log(stock_data.length);
        setGraphData({ data: stock_data.reverse() });
      })
      .catch((e) => console.log("Error STOCK_DATA_URL:", e));
  };
  useEffect(() => {
    if (dropdownValue?.length >= 3) {
      getStockData(dropdownValue, graphOptions[selectedGraphOption]);
    }
    
  }, [selectedGraphOption]);
  const handleDropdown = (dropdown) => {
    setGraphData(null);
    setCompanyData(null);
    setSelectedLink(null);
    setOtherData(null);
    getStockData(dropdown, graphOptions[selectedGraphOption]);
    setLoading(true);

    fetch(COMPANY_DATA_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ symbol: dropdown }),
    })
      .then((response) => response.json())
      .then((data) => {
        const company_data = {
          title: "Comapny Data",
          data: [
            { attribute: "vol Avg.", value: data["Vol Avg"].toLocaleString() },
            { attribute: "P/E TTM", value: data["P/E TTM"].toFixed(2) },
            { attribute: "Website", value: data["Website"] },
            { attribute: "CEO", value: data["CEO"] },
            {
              attribute: "Full Time Employees",
              value: data["Full Time Employees"],
            },
            { attribute: "Currency", value: data["Currency"] },
            {
              attribute: "Revenue",
              value: formatNumber(data["Revenue, 2022"]),
            },
            {
              attribute: "Net Income, 2022",
              value: formatNumber(data["Net Income, 2022"]),
            },
          ],
          about: data?.About,
        };
        setCompanyData(company_data);
        // console.log(company_data, "Company Data");
      })
      .catch((e) => console.log("Error STOCK_DATA_URL:", e));

    fetch(COMPANY_OTHER_INFO_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ symbol: dropdown }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        const array_of_headings = [];

        const titles = ["Executive Insights", "Deep Dive"];
        const sources = ["source_10k", "source_concall"];

        const paragraphHeadings = [
          {
            alerts_and_warnings: "Alerts & Warnings",
            financial_highlights: "Financial Highlights",
            strategic_focus: "Strategic Focus & Future Plans",
          },
          {
            swot_analysis: "Swot Analysis",
            investment_themes: "Investment Themes",
            risk_mitigations: "Risk & Mitigations",
            challenges_highlighted: "Challenges Highlighted in Transcript",
          },
        ];
        const sourceData = {
          alerts_and_warnings: 0,
          financial_highlights: 0,
          strategic_focus: 1,
          swot_analysis: 0,
          investment_themes: 1,
          risk_mitigations: 0,
          challenges_highlighted: 0,
          transcript: 1,
        };

        for (let i = 0; i < titles.length; i++) {
          const title = titles[i];
          const innerArray = [];

          const numParagraphs = Object.keys(paragraphHeadings[i]).length; // Generating 3 to 5 paragraphs
          const mainId = faker.database.mongodbObjectId();

          for (let j = 0; j < numParagraphs; j++) {
            const para_index = Object.keys(paragraphHeadings[i])[j];
            const paragraph = paragraphHeadings[i][para_index];
            // console.log(para_index, "para");
            const id = faker.database.mongodbObjectId();
            const dataArray = [];
            const str_for_this_para = data[para_index].toString().trim();

            if (str_for_this_para?.length < 3) continue;
            if (para_index == "alerts_and_warnings") {
              const data_for_this_para = str_for_this_para?.split("\n\n") || [];
              // console.log(data_for_this_para);

              for (let j = 0; j < data_for_this_para.length; j++) {
                const q_data = data_for_this_para[j].split(":");
                const title = q_data[0];
                const paragraph = q_data[1] || "";

                const id = faker.database.mongodbObjectId();

                dataArray.push({
                  paragraph,
                  title,
                  id,
                  type: "card",
                  bold: true,
                });
              }

              if (data_for_this_para.length > 0)
                innerArray.push({
                  text: paragraph,
                  id,
                  dataArray,
                  source:
                    data[sources[sourceData[para_index]]] || "undetermined",
                });
            } else if (para_index == "financial_highlights") {
              const parsedData = str_for_this_para
                .split(/\n{2,}/)
                .map((section) => {
                  const [title, ...paragraph] = section
                    .split("\n")
                    .map((line) => line.toString().trim());
                  return title
                    ? { title, paragraph }
                    : { type: "paragraph", paragraph };
                });

              for (let j = 0; j < parsedData.length; j++) {
                //const title = parsedData[j].title?.replace("- ", "");
                const paragraph = (
                  <>
                    {parsedData[j].paragraph?.map((p, i) => (
                      <p key={i}>{p}</p>
                    ))}
                  </>
                );
                dataArray.push({
                  paragraph,
                  //title,
                  id: faker.database.mongodbObjectId(),
                  type: "card",
                  bold: true,
                });
              }

              if (parsedData.length > 0) {
                innerArray.push({
                  text: paragraph,
                  id,
                  dataArray,
                  source:
                    data[sources[sourceData[para_index]]] || "undetermined",
                });
              }
            } else if (para_index == "strategic_focus") {
              const sections = str_for_this_para.split(/\n{2,}/);
              const jsonData = [];
              let currentSection = null;

              sections.forEach((section) => {
                if (!section) return;

                if (section.endsWith(":")) {
                  if (currentSection) {
                    // If there's a currentSection available, push it to jsonData before starting a new section
                    jsonData.push(currentSection);
                }
                  currentSection = {
                    title: section?.replace(":", ""),
                    paragraphs: [],
                  };
              
                } else {
                  if (currentSection) {
                  currentSection.paragraphs = currentSection.paragraphs.concat(
                    section.split("\n")
                  );
                } else {
                  jsonData.push({
                      title: "",
                      paragraphs: section.split("\n")
                  });
              }
          }
              });
              if (currentSection) {
                jsonData.push(currentSection);
            }
              for (let j = 0; j < jsonData.length; j++) {
                const title = jsonData[j].title;
                const paragraph = (
                  <>
                    {jsonData[j].paragraphs.map((p, i) => (
                      <p key={i}>{p}</p>
                    ))}
                  </>
                );
                const id = faker.database.mongodbObjectId();
                if (title?.trim().length >= 0)
                  dataArray.push({
                    paragraph,
                    title,
                    id,
                    type: "card",
                    bold: true,
                  });
              }

              if (dataArray.length > 0) {
                innerArray.push({
                  text: paragraph,
                  id,
                  dataArray,
                  source:
                    data[sources[sourceData[para_index]]] || "undetermined",
                });
              }
            } else if (para_index == "swot_analysis") {
              const data_for_this_para = str_for_this_para?.split("\n\n") || [];
          
              for (let j = 0; j < data_for_this_para.length; j++) {
                  // Split by the first occurrence of ":"
                  const indexOfColon = data_for_this_para[j].indexOf(":");
                  const title = data_for_this_para[j].substring(0, indexOfColon).trim();
                  const content = data_for_this_para[j].substring(indexOfColon + 1).trim().replace("- ", "- ") || "";
          
                  // Handle the line breaks in the content
                  const paragraphs = content.split("\n").map((line, idx) => <p key={idx}>{line.trim()}</p>);
                  const id = faker.database.mongodbObjectId();
          
                  dataArray.push({
                      paragraph: <>{paragraphs}</>,
                      title,
                      id,
                      type: "card",
                      bold: true,
                  });
              }
          
              if (data_for_this_para.length > 0)
                  innerArray.push({
                      text: paragraph,
                      id,
                      dataArray,
                      source: data[sources[sourceData[para_index]]] || "undetermined",
                  });
          }
           else if (para_index == "investment_themes") {
              const sections = str_for_this_para.split(/\n{2,}/);
              const jsonData = [];
              let currentSection = null;

              sections.forEach((section) => {
                if (!section) return;

                if (section.endsWith(":")) {
                  if (currentSection) {
                    // If there's a currentSection available, push it to jsonData before starting a new section
                    jsonData.push(currentSection);
                }
                  currentSection = {
                    title: section?.replace(":", ""),
                    paragraphs: [],
                  };
              
                } else {
                  if (currentSection) {
                  currentSection.paragraphs = currentSection.paragraphs.concat(
                    section.split("\n")
                  );
                } else {
                  jsonData.push({
                      title: "",
                      paragraphs: section.split("\n")
                  });
              }
          }
              });
              if (currentSection) {
                jsonData.push(currentSection);
            }
              for (let j = 0; j < jsonData.length; j++) {
                const title = jsonData[j].title;
                const paragraph = (
                  <>
                    {jsonData[j].paragraphs.map((p, i) => (
                      <p key={i}>{p}</p>
                    ))}
                  </>
                );
                const id = faker.database.mongodbObjectId();
                if (title?.trim().length >= 0)
                  dataArray.push({
                    paragraph,
                    title,
                    id,
                    type: "card",
                    bold: true,
                  });
              }

              if (dataArray.length > 0) {
                innerArray.push({
                  text: paragraph,
                  id,
                  dataArray,
                  source:
                    data[sources[sourceData[para_index]]] || "undetermined",
                });
              }
            } else if (para_index == "risk_mitigations") {
              // console.log(data_for_this_para);
              const parsedData = str_for_this_para
                .split(/\n{2,}/)
                .map((section) => {
                  const [title, ...paragraph] = section
                    .split("\n")
                    .map((line) => line.toString().trim());
                  return title
                    ? { title, paragraph }
                    : { type: "paragraph", paragraph };
                });
          
              for (let j = 0; j < parsedData.length; j++) {
                const title = parsedData[j].title?.replace("- ", "");
                const isTitleNumbered = /^\d+\./.test(title); // Check if title starts with a number followed by a period
          
                const paragraph = (
                  <>
                    {parsedData[j].paragraph?.map((p, i) => (
                      <p key={i}>{p}</p>
                    ))}
                  </>
                );
          
                dataArray.push({
                  paragraph,
                  title,
                  id: faker.database.mongodbObjectId(),
                  type: "card",
                  bold: !isTitleNumbered, // Set bold property based on the check
                });
              }
          
              if (parsedData.length > 0) {
                innerArray.push({
                  text: paragraph,
                  id,
                  dataArray,
                  source: data[sources[sourceData[para_index]]] || "",
                });
              }
          }
          else if (para_index == "challenges_highlighted") {
            const cleanedText = str_for_this_para.trim();
            const sections = cleanedText.split(/\n{2,}/);
        
            sections.forEach((section) => {
                const lines = section.split("\n").map((line) => line.trim());
                
                let title = "";
                let paragraph = "";
                
                if (lines[0]?.endsWith(':')) { // if the first line ends with :, consider it as a title
                    title = lines[0].replace(':', '').trim();
                    paragraph = lines.slice(1).join(" "); // all lines after the title are considered as paragraph
                } else { // if not, consider the whole section as the paragraph
                    paragraph = lines.join(" ");
                }
        
                if (paragraph) { // push to dataArray only if there's valid content
                    dataArray.push({
                        paragraph,
                        title, // this might be an empty string if no title was identified
                        id: faker.database.mongodbObjectId(),
                        type: "card",
                        bold: true,
                    });
                }
            });
        
            if (dataArray.length > 0) {
                innerArray.push({
                    text: paragraph,
                    id,
                    dataArray,
                    source: data[sources[sourceData[para_index]]] || "",
                });
            }
        }
        
          }

          array_of_headings.push({
            title: title,
            paragraphs: innerArray,
            id: mainId,
          });
        }
        setOtherData(array_of_headings);
        setSelectedLink(array_of_headings?.[0]?.paragraphs?.[0]);
        // console.log(array_of_headings);
        setLoading(false);
      })
      .catch((e) => console.log("Error STOCK_DATA_URL:", e));
    setDropdownValue(dropdown);
  };

  return (
    <main className="h-[100vh] bg-[#F7F8F9] text-black">
      <Header />
      <div className="w-100 h-[92vh] p-8 flex">
        <Sidebar
          selectedLink={selectedLink}
          setSelectedLink={setSelectedLink}
          data={otherData}
          // data={otherData}
          handleDropdownChange={handleDropdown}
          
          inputValue={inputValue}
          setInputValue={setInputValue}
        />
        {!loading ? (
          <ReportContent
            graphData={graphData}
            data={selectedLink}
            full_data={otherData}
            companyData={companyData}
            selectedGraphOption={selectedGraphOption}
            setSelectedGraphOption={setSelectedGraphOption}
          />
        ) : (
          <div className="flex-[.7] h-[92vh]">
            <Loader />
          </div>
        )}
      </div>
    </main>
  );
}


//old code 
// "use client";
// import Header from "@/components/Header";
// import ReportContent from "@/components/Sections/Reports/ReportContent";
// import Sidebar from "@/components/Sections/Reports/Sidebar";
// import { useEffect, useState } from "react";
// import { faker } from "@faker-js/faker";
// import {
//   COMPANY_DATA_URL,
//   COMPANY_OTHER_INFO_URL,
//   STOCK_DATA_URL,
// } from "@/Constants";
// import Loader from "@/components/Loader";
// import { defaultOption } from "@/Constants/CompanyOptions";
// function formatNumber(number) {
//   const ranges = [
//     { divider: 1e12, suffix: "T" },
//     { divider: 1e9, suffix: "B" },
//     { divider: 1e6, suffix: "M" },
//     { divider: 1e3, suffix: "K" },
//   ];

//   for (const range of ranges) {
//     if (number >= range.divider) {
//       return (
//         (number / range.divider).toFixed(1).replace(/\.0$/, "") + range.suffix
//       );
//     }
//   }

//   return number.toString();
// }
// export default function FlashReport() {
//   const [selectedLink, setSelectedLink] = useState(null);
//   const [graphData, setGraphData] = useState(null);
//   const [companyData, setCompanyData] = useState(null);
//   const [otherData, setOtherData] = useState(null);
//   const [selectedGraphOption, setSelectedGraphOption] = useState(0);
//   const [dropdownValue, setDropdownValue] = useState(defaultOption);
//   const graphOptions = ["1_month", "1_year", "5_year"];
//   const [loading, setLoading] = useState(false);
//   const [inputValue, setInputValue] = useState(defaultOption);

//   const getStockData = (dropdown, period = "1_month") => {
//     fetch(STOCK_DATA_URL, {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({
//         symbol: dropdown,
//         period: graphOptions[selectedGraphOption],
//       }),
//     })
//       .then((response) => {
//         console.log(response);
//         return response.json();
//       })
//       .then((data) => {
//         function formatDate(inputDate, period) {
//           const months = [
//             "Jan",
//             "Feb",
//             "Mar",
//             "Apr",
//             "May",
//             "Jun",
//             "Jul",
//             "Aug",
//             "Sep",
//             "Oct",
//             "Nov",
//             "Dec",
//           ];

//           const parts = inputDate.split("-");
//           const year = parts[0];
//           const month = months[parseInt(parts[1]) - 1];
//           const day = parts[2];

//           if (period == "5_year") return inputDate;
//           return `${month}-${day}`;
//         }
//         const stock_data = [];
//         data?.stock_price_data?.forEach((e) =>
//           stock_data.push({
//             name: formatDate(e.date, graphOptions[selectedGraphOption]),
//             pv: e.close_price,
//           })
//         );
//         // console.log(stock_data.length);
//         setGraphData({ data: stock_data.reverse() });
//       })
//       .catch((e) => console.log("Error STOCK_DATA_URL:", e));
//   };
//   useEffect(() => {
//     if (dropdownValue?.length >= 3) {
//       getStockData(dropdownValue, graphOptions[selectedGraphOption]);
//     }
    
//   }, [selectedGraphOption]);
//   const handleDropdown = (dropdown) => {
//     setGraphData(null);
//     setCompanyData(null);
//     setSelectedLink(null);
//     setOtherData(null);
//     getStockData(dropdown, graphOptions[selectedGraphOption]);
//     setLoading(true);

//     fetch(COMPANY_DATA_URL, {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ symbol: dropdown }),
//     })
//       .then((response) => response.json())
//       .then((data) => {
//         const company_data = {
//           title: "Comapny Data",
//           data: [
//             { attribute: "vol Avg.", value: data["Vol Avg"].toLocaleString() },
//             { attribute: "P/E TTM", value: data["P/E TTM"].toFixed(2) },
//             { attribute: "Website", value: data["Website"] },
//             { attribute: "CEO", value: data["CEO"] },
//             {
//               attribute: "Full Time Employees",
//               value: data["Full Time Employees"],
//             },
//             { attribute: "Currency", value: data["Currency"] },
//             {
//               attribute: "Revenue",
//               value: formatNumber(data["Revenue, 2022"]),
//             },
//             {
//               attribute: "Net Income, 2022",
//               value: formatNumber(data["Net Income, 2022"]),
//             },
//           ],
//           about: data?.About,
//         };
//         setCompanyData(company_data);
//         // console.log(company_data, "Company Data");
//       })
//       .catch((e) => console.log("Error STOCK_DATA_URL:", e));

//     fetch(COMPANY_OTHER_INFO_URL, {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ symbol: dropdown }),
//     })
//       .then((response) => response.json())
//       .then((data) => {
//         console.log(data);
//         const array_of_headings = [];

//         const titles = ["Executive Insights", "Deep Dive"];
//         const sources = ["source_10k", "source_concall"];

//         const paragraphHeadings = [
//           {
//             alerts_and_warnings: "Alerts & Warnings",
//             financial_highlights: "Financial Highlights",
//             strategic_focus: "Strategic Focus & Future Plans",
//           },
//           {
//             swot_analysis: "Swot Analysis",
//             investment_themes: "Investment Themes",
//             risk_mitigations: "Risk & Mitigations",
//             challenges_highlighted: "Challenges Highlighted in Transcript",
//           },
//         ];
//         const sourceData = {
//           alerts_and_warnings: 0,
//           financial_highlights: 0,
//           strategic_focus: 1,
//           swot_analysis: 0,
//           investment_themes: 1,
//           risk_mitigations: 0,
//           challenges_highlighted: 0,
//           transcript: 1,
//         };

//         for (let i = 0; i < titles.length; i++) {
//           const title = titles[i];
//           const innerArray = [];

//           const numParagraphs = Object.keys(paragraphHeadings[i]).length; // Generating 3 to 5 paragraphs
//           const mainId = faker.database.mongodbObjectId();

//           for (let j = 0; j < numParagraphs; j++) {
//             const para_index = Object.keys(paragraphHeadings[i])[j];
//             const paragraph = paragraphHeadings[i][para_index];
//             // console.log(para_index, "para");
//             const id = faker.database.mongodbObjectId();
//             const dataArray = [];
//             const str_for_this_para = data[para_index].toString().trim();

//             if (str_for_this_para?.length < 3) continue;
//             if (para_index == "alerts_and_warnings") {
//               const data_for_this_para = str_for_this_para?.split("\n\n") || [];
//               // console.log(data_for_this_para);

//               for (let j = 0; j < data_for_this_para.length; j++) {
//                 const q_data = data_for_this_para[j].split(":");
//                 const title = q_data[0];
//                 const paragraph = q_data[1] || "some undefined";

//                 const id = faker.database.mongodbObjectId();

//                 dataArray.push({
//                   paragraph,
//                   title,
//                   id,
//                   type: "card",
//                   bold: true,
//                 });
//               }

//               if (data_for_this_para.length > 0)
//                 innerArray.push({
//                   text: paragraph,
//                   id,
//                   dataArray,
//                   source:
//                     data[sources[sourceData[para_index]]] || "undetermined",
//                 });
//             } else if (para_index == "financial_highlights") {
//               const data_for_this_para = str_for_this_para?.split("-") || [];
//               for (let j = 0; j < data_for_this_para.length; j++) {
//                 const q_data = data_for_this_para[j].split("- ");
//                 const title = q_data[0];
//                 // const paragraph = q_data[1] || "some undefined";

//                 const id = faker.database.mongodbObjectId();
//                 if (title.length > 3)
//                   dataArray.push({
//                     // paragraph,
//                     title,
//                     id,
//                     type: "card",
//                     bold: false,
//                   });
//               }

//               if (dataArray.length > 0)
//                 innerArray.push({
//                   text: paragraph,
//                   id,
//                   dataArray,
//                   source:
//                     data[sources[sourceData[para_index]]] || "undetermined",
//                 });
//             } else if (para_index == "strategic_focus") {
//               const sections = str_for_this_para.split(/\n{2,}/);

//               // Initialize variables to store the parsed data
//               const jsonData = [];
//               let currentSection = null;

//               // Loop through each section and parse the content
//               sections.forEach((section) => {
//                 if (!section) return;
//                 if (section.endsWith(":")) {
//                   // This section contains only a title
//                   currentSection = {
//                     title: section?.replace(":", ""),
//                     paragraphs: [],
//                   };
//                   jsonData.push(currentSection);
//                 } else if (currentSection) {
//                   // This section contains paragraphs
//                   const paragraphs = section.split("\n");
//                   currentSection.paragraphs =
//                     currentSection.paragraphs.concat(paragraphs);
//                 }
//               });
//               for (let j = 0; j < jsonData.length; j++) {
//                 const title = jsonData[j].title;
//                 const paragraph = (
//                   <>
//                     {jsonData[j].paragraphs.map((p, i) => (
//                       <p key={i}>{p}</p>
//                     ))}
//                   </>
//                 );
//                 const id = faker.database.mongodbObjectId();
//                 if (title?.length > 3)
//                   dataArray.push({
//                     paragraph,
//                     title,
//                     id,
//                     type: "card",
//                     bold: true,
//                   });
//               }

//               if (dataArray.length > 0)
//                 innerArray.push({
//                   text: paragraph,
//                   id,
//                   dataArray,
//                   source:
//                     data[sources[sourceData[para_index]]] || "undetermined",
//                 });
//             } else if (para_index == "swot_analysis") {
//               const data_for_this_para = str_for_this_para?.split("\n\n") || [];
//               // console.log(data_for_this_para);

//               for (let j = 0; j < data_for_this_para.length; j++) {
//                 const q_data = data_for_this_para[j].split(":");
//                 const title = q_data[0];
//                 const paragraph =
//                   q_data[1]?.replace("- ", "") || "some undefined";

//                 const id = faker.database.mongodbObjectId();

//                 dataArray.push({
//                   paragraph,
//                   title,
//                   id,
//                   type: "card",
//                   bold: true,
//                 });
//               }

//               if (data_for_this_para.length > 0)
//                 innerArray.push({
//                   text: paragraph,
//                   id,
//                   dataArray,
//                   source:
//                     data[sources[sourceData[para_index]]] || "undetermined",
//                 });
//             } else if (para_index == "investment_themes") {
//               const sections = str_for_this_para.split(/\n{2,}/);
//               const jsonData = [];
//               let currentSection = null;

//               sections.forEach((section) => {
//                 if (!section) return;

//                 if (section.endsWith(":")) {
//                   currentSection = {
//                     title: section?.replace(":", ""),
//                     paragraphs: [],
//                   };
//                   jsonData.push(currentSection);
//                 } else if (currentSection) {
//                   currentSection.paragraphs = currentSection.paragraphs.concat(
//                     section.split("\n")
//                   );
//                 }
//               });

//               for (let j = 0; j < jsonData.length; j++) {
//                 const title = jsonData[j].title;
//                 const paragraph = (
//                   <>
//                     {jsonData[j].paragraphs.map((p, i) => (
//                       <p key={i}>{p}</p>
//                     ))}
//                   </>
//                 );
//                 const id = faker.database.mongodbObjectId();
//                 if (title?.length > 3)
//                   dataArray.push({
//                     paragraph,
//                     title,
//                     id,
//                     type: "card",
//                     bold: true,
//                   });
//               }

//               if (dataArray.length > 0) {
//                 innerArray.push({
//                   text: paragraph,
//                   id,
//                   dataArray,
//                   source:
//                     data[sources[sourceData[para_index]]] || "undetermined",
//                 });
//               }
//             } else if (para_index == "risk_mitigations") {
//               // console.log(data_for_this_para);
//               const parsedData = str_for_this_para
//                 .split(/\n{2,}/)
//                 .map((section) => {
//                   const [title, ...paragraph] = section
//                     .split("\n")
//                     .map((line) => line.toString().trim());
//                   return title
//                     ? { title, paragraph }
//                     : { type: "paragraph", paragraph };
//                 });

//               for (let j = 0; j < parsedData.length; j++) {
//                 const title = parsedData[j].title?.replace("- ", "");
//                 const paragraph = (
//                   <>
//                     {parsedData[j].paragraph?.map((p, i) => (
//                       <p key={i}>{p}</p>
//                     ))}
//                   </>
//                 );
//                 dataArray.push({
//                   paragraph,
//                   title,
//                   id: faker.database.mongodbObjectId(),
//                   type: "card",
//                   bold: true,
//                 });
//               }

//               if (parsedData.length > 0) {
//                 innerArray.push({
//                   text: paragraph,
//                   id,
//                   dataArray,
//                   source:
//                     data[sources[sourceData[para_index]]] || "undetermined",
//                 });
//               }
//             } else if (para_index == "challenges_highlighted") {
//               // console.log(data_for_this_para);

//               const cleanedText = str_for_this_para.trim();
//               const sections = cleanedText.split(/\n{2,}/);

//               sections.forEach((section) => {
//                 const lines = section.split("\n").map((line) => line.trim());
//                 const title = lines[0]
//                   ?.replace(/^\d+\./, "")
//                   ?.replace("- ", "")
//                   ?.trim();
//                 const paragraph = lines.slice(1).join(" ");

//                 if (title && paragraph) {
//                   dataArray.push({
//                     paragraph,
//                     title,
//                     id: faker.database.mongodbObjectId(),
//                     type: "card",
//                     bold: true,
//                   });
//                 }
//               });

//               if (dataArray.length > 0) {
//                 innerArray.push({
//                   text: paragraph,
//                   id,
//                   dataArray,
//                   source:
//                     data[sources[sourceData[para_index]]] || "undetermined",
//                 });
//               }
//             }
//           }

//           array_of_headings.push({
//             title: title,
//             paragraphs: innerArray,
//             id: mainId,
//           });
//         }
//         setOtherData(array_of_headings);
//         setSelectedLink(array_of_headings?.[0]?.paragraphs?.[0]);
//         // console.log(array_of_headings);
//         setLoading(false);
//       })
//       .catch((e) => console.log("Error STOCK_DATA_URL:", e));
//     setDropdownValue(dropdown);
//   };

//   return (
//     <main className="h-[100vh] bg-[#F7F8F9] text-black">
//       <Header />
//       <div className="w-100 h-[92vh] p-8 flex">
//         <Sidebar
//           selectedLink={selectedLink}
//           setSelectedLink={setSelectedLink}
//           data={otherData}
//           // data={otherData}
//           handleDropdownChange={handleDropdown}
          
//           inputValue={inputValue}
//           setInputValue={setInputValue}
//         />
//         {!loading ? (
//           <ReportContent
//             graphData={graphData}
//             data={selectedLink}
//             full_data={otherData}
//             companyData={companyData}
//             selectedGraphOption={selectedGraphOption}
//             setSelectedGraphOption={setSelectedGraphOption}
//           />
//         ) : (
//           <div className="flex-[.7] h-[92vh]">
//             <Loader />
//           </div>
//         )}
//       </div>
//     </main>
//   );
// }
