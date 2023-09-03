export const BASE_URL = "https://api.finance-flash.com/";

export const SET_INDEX_KEY_URL = BASE_URL + "set_index_key";
export const SEARCH_URL = BASE_URL + "search";
export const GET_ALL_SENTENCES_URL = BASE_URL + "get_all_sentences";
// export const GET_SOURCE = BASE_URL + "source";

export const LINK_10K_URL = BASE_URL + "link_10k";


export const SET_INDEX_KEY_URL_CONCALL = SET_INDEX_KEY_URL + "_concall";
export const SEARCH_URL_CONCALL = SEARCH_URL + "_concall";
export const GET_SOURCE_CONCALL = BASE_URL + "source_concall";
export const GET_ALL_SENTENCES_URL_CONCALL =
  BASE_URL + "get_allsentences_concall_semantic";

export const ASK_SEC_GPT_URL = BASE_URL+"askGPT"

export const SET_SYMBOL_KEY_NEGATIVE_CONCALL_URL =
  BASE_URL + "set_symbol_key_concall_negative";

export const SET_SYMBOL_KEY_NEGATIVE_10K_URL =
  BASE_URL + "set_symbol_key_10k_negative";

export const GET_ALL_SENTENCES_URL_CONCALL_NEGATIVE =
  BASE_URL + "get_allsentences_concall_negative";

export const STOCK_DATA_URL = BASE_URL + "stock_price_data"
export const COMPANY_DATA_URL = BASE_URL + "company-data"
export const COMPANY_OTHER_INFO_URL = BASE_URL + "other_info"



export const TEST_SEARCH_DATA = {
  results: [
    {
      "Cleaned Sentence":
        "Apple Inc. | 2022 Form 10-K | 22 ---------------------------------------------------------------------------------------------------------------------------------- Gross Margin Products and Services gross margin and gross margin percentage for 2022, 2021 and 2020 were as follows (dollars in millions): 2022 2021 2020 Gross margin: Products $ 114,728 $ 105,126 $ 69,461 Services 56,054 47,710 35,495 Total gross margin $ 170,782 $ 152,836 $ 104,956 Gross margin percentage: Products 36.3 % 35.3 % 31.5 % Services 71.7 % 69.7 % 66.0 % Total gross margin percentage 43.3 % 41.8 % 38.2 % Products Gross Margin Products gross margin increased during 2022 compared to 2021 due primarily to a different Products mix and higher Products volume, partially offset by the weakness in foreign currencies relative to the U.S. dollar.",
      Position: 532,
    },
    {
      "Cleaned Sentence":
        "Products gross margin percentage increased during 2022 compared to 2021 due primarily to a different Products mix, partially offset by the weakness in foreign currencies relative to the U.S. dollar.",
      Position: 533,
    },
    {
      "Cleaned Sentence":
        "Services Gross Margin Services gross margin increased during 2022 compared to 2021 due primarily to higher Services net sales, partially offset by the weakness in foreign currencies relative to the U.S. dollar.",
      Position: 534,
      Type: "similar_sentences",
    },
    {
      "Cleaned Sentence":
        "Services gross margin percentage increased during 2022 compared to 2021 due primarily to improved leverage and a different Services mix, partially offset by the weakness in foreign currencies relative to the U.S. dollar.",
      Position: 535,
    },
    {
      "Cleaned Sentence":
        "The Company’s future gross margins can be impacted by a variety of factors, as discussed in Part I, Item 1A of this Form 10-K under the heading “Risk Factors.” As a result, the Company believes, in general, gross margins will be subject to volatility and downward pressure.",
      Position: 536,
    },
    {
      "Cleaned Sentence":
        "Financial Risks The Company expects its quarterly net sales and results of operations to fluctuate.",
      Position: 406,
    },
    {
      "Cleaned Sentence":
        "The Company’s profit margins vary across its products, services, geographic segments and distribution channels.",
      Position: 407,
    },
    {
      "Cleaned Sentence":
        "For example, the gross margins on the Company’s products and services vary significantly and can change over time.",
      Position: 408,
      Type: "similar_sentences",
    },
    {
      "Cleaned Sentence":
        "The Company’s gross margins are subject to volatility and downward pressure due to a variety of factors, including: continued industry-wide global product pricing pressures and product pricing actions that the Company may take in response to such pressures; increased competition; the Company’s ability to effectively stimulate demand for certain of its products and services; compressed product life cycles; supply shortages; potential increases in the cost of components, outside manufacturing services, and developing, acquiring and delivering content for the Company’s services; the Company’s ability to manage product quality and warranty costs effectively; shifts in the mix of products and services, or in the geographic, currency or channel mix, including to the extent that regulatory changes require the Company to modify its product and service offerings; fluctuations in foreign exchange rates; inflation and other macroeconomic pressures; and the introduction of new products or services, including new products or services with higher cost structures.",
      Position: 409,
    },
    {
      "Cleaned Sentence":
        "These and other factors could have a materially adverse impact on the Company’s results of operations and financial condition.",
      Position: 410,
    },
    {
      "Cleaned Sentence":
        "In some circumstances, for competitive or other reasons, the Company may decide not to raise international pricing to offset the U.S. dollar’s strengthening, which would adversely affect the U.S. dollar value of the gross margins the Company earns on foreign currency–denominated sales.",
      Position: 420,
    },
    {
      "Cleaned Sentence":
        "Conversely, a strengthening of foreign currencies relative to the U.S. dollar, while generally beneficial to the Company’s foreign currency–denominated sales and earnings, could cause the Company to reduce international pricing and incur losses on its foreign currency derivative instruments, thereby limiting the benefit.",
      Position: 421,
    },
    {
      "Cleaned Sentence":
        "Additionally, strengthening of foreign currencies may increase the Company’s cost of product components denominated in those currencies, thus adversely affecting gross margins.",
      Position: 422,
      Type: "similar_sentences",
    },
    {
      "Cleaned Sentence":
        "The Company uses derivative instruments, such as foreign currency forward and option contracts, to hedge certain exposures to fluctuations in foreign currency exchange rates.",
      Position: 423,
    },
    {
      "Cleaned Sentence":
        "The use of such hedging activities may not be effective to offset any, or more than a portion, of the adverse financial effects of unfavorable movements in foreign exchange rates over the limited time the hedges are in place.",
      Position: 424,
    },
    {
      "Cleaned Sentence":
        "For example, tensions between the U.S. and China have led to a series of tariffs being imposed by the U.S. on imports from China mainland, as well as other business restrictions.",
      Position: 156,
    },
    {
      "Cleaned Sentence":
        "Tariffs increase the cost of the Company’s products and the components and raw materials that go into making them.",
      Position: 157,
    },
    {
      "Cleaned Sentence":
        "These increased costs can adversely impact the gross margin that the Company earns on its products.",
      Position: 158,
      Type: "similar_sentences",
    },
    {
      "Cleaned Sentence":
        "Tariffs can also make the Company’s products more expensive for customers, which could make the Company’s products less competitive and reduce consumer demand.",
      Position: 159,
    },
    {
      "Cleaned Sentence":
        "Countries may also adopt other measures, such as controls on imports or exports of goods, technology or data, that could adversely impact the Company’s operations and supply chain and limit the Company’s ability to offer its products and services as designed.",
      Position: 160,
    },
    {
      "Cleaned Sentence":
        "The weakness in foreign currencies relative to the U.S. dollar had an unfavorable year-over-year impact on Rest of Asia Pacific net sales during 2022.",
      Position: 531,
    },
    {
      "Cleaned Sentence":
        "Apple Inc. | 2022 Form 10-K | 22 ---------------------------------------------------------------------------------------------------------------------------------- Gross Margin Products and Services gross margin and gross margin percentage for 2022, 2021 and 2020 were as follows (dollars in millions): 2022 2021 2020 Gross margin: Products $ 114,728 $ 105,126 $ 69,461 Services 56,054 47,710 35,495 Total gross margin $ 170,782 $ 152,836 $ 104,956 Gross margin percentage: Products 36.3 % 35.3 % 31.5 % Services 71.7 % 69.7 % 66.0 % Total gross margin percentage 43.3 % 41.8 % 38.2 % Products Gross Margin Products gross margin increased during 2022 compared to 2021 due primarily to a different Products mix and higher Products volume, partially offset by the weakness in foreign currencies relative to the U.S. dollar.",
      Position: 532,
    },
    {
      "Cleaned Sentence":
        "Products gross margin percentage increased during 2022 compared to 2021 due primarily to a different Products mix, partially offset by the weakness in foreign currencies relative to the U.S. dollar.",
      Position: 533,
      Type: "similar_sentences",
    },
    {
      "Cleaned Sentence":
        "Services Gross Margin Services gross margin increased during 2022 compared to 2021 due primarily to higher Services net sales, partially offset by the weakness in foreign currencies relative to the U.S. dollar.",
      Position: 534,
    },
    {
      "Cleaned Sentence":
        "Services gross margin percentage increased during 2022 compared to 2021 due primarily to improved leverage and a different Services mix, partially offset by the weakness in foreign currencies relative to the U.S. dollar.",
      Position: 535,
    },
    {
      "Cleaned Sentence":
        "The Company could also experience a significant increase in payment card transaction costs or lose the ability to process payment cards if it fails to follow payment card industry data security standards, which could materially adversely affect the Company’s business, reputation, results of operations and financial condition.",
      Position: 405,
    },
    {
      "Cleaned Sentence":
        "Financial Risks The Company expects its quarterly net sales and results of operations to fluctuate.",
      Position: 406,
    },
    {
      "Cleaned Sentence":
        "The Company’s profit margins vary across its products, services, geographic segments and distribution channels.",
      Position: 407,
      Type: "similar_sentences",
    },
    {
      "Cleaned Sentence":
        "For example, the gross margins on the Company’s products and services vary significantly and can change over time.",
      Position: 408,
    },
    {
      "Cleaned Sentence":
        "The Company’s gross margins are subject to volatility and downward pressure due to a variety of factors, including: continued industry-wide global product pricing pressures and product pricing actions that the Company may take in response to such pressures; increased competition; the Company’s ability to effectively stimulate demand for certain of its products and services; compressed product life cycles; supply shortages; potential increases in the cost of components, outside manufacturing services, and developing, acquiring and delivering content for the Company’s services; the Company’s ability to manage product quality and warranty costs effectively; shifts in the mix of products and services, or in the geographic, currency or channel mix, including to the extent that regulatory changes require the Company to modify its product and service offerings; fluctuations in foreign exchange rates; inflation and other macroeconomic pressures; and the introduction of new products or services, including new products or services with higher cost structures.",
      Position: 409,
    },
    {
      "Cleaned Sentence":
        "Services Gross Margin Services gross margin increased during 2022 compared to 2021 due primarily to higher Services net sales, partially offset by the weakness in foreign currencies relative to the U.S. dollar.",
      Position: 534,
    },
    {
      "Cleaned Sentence":
        "Services gross margin percentage increased during 2022 compared to 2021 due primarily to improved leverage and a different Services mix, partially offset by the weakness in foreign currencies relative to the U.S. dollar.",
      Position: 535,
    },
    {
      "Cleaned Sentence":
        "The Company’s future gross margins can be impacted by a variety of factors, as discussed in Part I, Item 1A of this Form 10-K under the heading “Risk Factors.” As a result, the Company believes, in general, gross margins will be subject to volatility and downward pressure.",
      Position: 536,
      Type: "similar_sentences",
    },
    {
      "Cleaned Sentence":
        "Operating Expenses Operating expenses for 2022, 2021 and 2020 were as follows (dollars in millions): 2022 Change 2021 Change 2020 Research and development $ 26,251 20 % $ 21,914 17 % $ 18,752 Percentage of total net sales 7 % 6 % 7 % Selling, general and administrative $ 25,094 14 % $ 21,973 10 % $ 19,916 Percentage of total net sales 6 % 6 % 7 % Total operating expenses $ 51,345 17 % $ 43,887 13 % $ 38,668 Percentage of total net sales 13 % 12 % 14 % Research and Development The year-over-year growth in R&D expense in 2022 was driven primarily by increases in headcount-related expenses and engineering program costs.",
      Position: 537,
    },
    {
      "Cleaned Sentence":
        "Selling, General and Administrative The year-over-year growth in selling, general and administrative expense in 2022 was driven primarily by increases in headcount-related expenses, advertising and professional services.",
      Position: 538,
    },
    {
      "Cleaned Sentence":
        "Products gross margin percentage increased during 2022 compared to 2021 due primarily to a different Products mix, partially offset by the weakness in foreign currencies relative to the U.S. dollar.",
      Position: 533,
    },
    {
      "Cleaned Sentence":
        "Services Gross Margin Services gross margin increased during 2022 compared to 2021 due primarily to higher Services net sales, partially offset by the weakness in foreign currencies relative to the U.S. dollar.",
      Position: 534,
    },
    {
      "Cleaned Sentence":
        "Services gross margin percentage increased during 2022 compared to 2021 due primarily to improved leverage and a different Services mix, partially offset by the weakness in foreign currencies relative to the U.S. dollar.",
      Position: 535,
      Type: "similar_sentences",
    },
    {
      "Cleaned Sentence":
        "The Company’s future gross margins can be impacted by a variety of factors, as discussed in Part I, Item 1A of this Form 10-K under the heading “Risk Factors.” As a result, the Company believes, in general, gross margins will be subject to volatility and downward pressure.",
      Position: 536,
    },
    {
      "Cleaned Sentence":
        "Operating Expenses Operating expenses for 2022, 2021 and 2020 were as follows (dollars in millions): 2022 Change 2021 Change 2020 Research and development $ 26,251 20 % $ 21,914 17 % $ 18,752 Percentage of total net sales 7 % 6 % 7 % Selling, general and administrative $ 25,094 14 % $ 21,973 10 % $ 19,916 Percentage of total net sales 6 % 6 % 7 % Total operating expenses $ 51,345 17 % $ 43,887 13 % $ 38,668 Percentage of total net sales 13 % 12 % 14 % Research and Development The year-over-year growth in R&D expense in 2022 was driven primarily by increases in headcount-related expenses and engineering program costs.",
      Position: 537,
    },
  ],
};
