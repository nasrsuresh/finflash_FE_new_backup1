import ResearchCard from "@/components/Cards/ResearchCard";
import GPT_ICON from "@/../public/assets/Icons/gpt.png";
import NOTE_ICON from "@/../public/assets/Icons/note.png";
import SEARCH_ICON from "@/../public/assets/Icons/search.png";
import { useRouter } from "next/navigation";
import { useAuth } from '@/hooks/useAuth';
import { useState } from 'react';
import { Inter } from "next/font/google";
import keynegatives from "@/../public/assets/Icons/keynegatives.png";
import ResearchSearchBar from "@/components/Inputs/ResearchSearchbar";

const inter = Inter({ weight: ["500", "800"], subsets: ["latin"] });

const RESEARCH_CARDS_ARRAY = [
  {
    title: "Contextual-search",
    details: "Beyond Traditional Search \n Dive into a sophisticated semantic search experience- Find not just words, but the very essence of your inquiry within financial documents.",
    image: SEARCH_ICON,
    link: 'contextual-search'
  },
  {
    title: "Key Negatives",
    details: "Knowledge Beyond the Obvious \n Stay informed and vigilant with our pre-researched key negative & red alert insights. Understand the underlying challenges each company faces, even before they surface",
    image: keynegatives,
    link: 'key-negatives'
  },
  {
    title: "Flash Report",
    details:
      "Analyst curated insights compilation \n Navigate the vast seas of data with our pre-researched topics on fundamental analysis. Every report is a lighthouse, guiding you towards clearer insights.",
    image: NOTE_ICON,
    link: 'flash-report'
  },
  {
    title: "Sec GPT",
    details:
      "Ask|Chat|Discover \n Chat directly with financial documents, making them answer your unique, custom questions. It's an interaction like you've never experienced before.",
    image: GPT_ICON,
    link: 'sec-gpt'
  },
];

const Research = ({ setIsOpen }) => {
  const { isAuthenticated } = useAuth();
  const [showFlashMessage, setShowFlashMessage] = useState(false);
  const router = useRouter();

  const handleCardClick = () => {
    if (!isAuthenticated()) {
      setIsOpen(true);
      return false;  // Not authenticated
    }
    return true;  // Authenticated
  };


  return (
    <div className={`${inter.className} w-full md:w-3/5 p-8 bg-[#F7F8F9]`}>
      {showFlashMessage && (
        <div className="fixed top-30 left-20 w-3/5 bg-red-600 border-l-4 border-red-800 p-4 flex justify-between items-center shadow-lg rounded-md">
          <div className="flex items-center">
            <button className="cursor-pointer mr-2" onClick={() => setShowFlashMessage(false)}>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
            <span className="text-white font">Kindly Sign Up To Proceed Further, No Credit Card Needed !</span>
          </div>
          <button className="text-red-200 hover:text-red-100 transition duration-150" onClick={() => setShowFlashMessage(false)}>Close</button>
        </div>
      )}

      <div className="mb-8 md:mt-0">
        <h1 className="text-2xl text-gray-800 font-bold ">
          Research the company in the style of
        </h1>
        <h1 className="text-2xl text-gray-800 font-bold">
          {'"'}
          <span className="text-primary -tracking-2">Warren Buffet</span>
          {'"'}
        </h1>
      </div>
      {RESEARCH_CARDS_ARRAY.map((v, i) => (
        <div className="my-5" key={i} onClick={() => { handleCardClick() && router.push(v.link) }}>
          <ResearchCard data={v} titleClass="cursor-pointer" />
        </div>
      ))}
    </div>
  );
};

export default Research;



//previous code
// import ResearchCard from "@/components/Cards/ResearchCard";
// import GPT_ICON from "@/../public/assets/Icons/gpt.png";
// import NOTE_ICON from "@/../public/assets/Icons/note.png";
// import SEARCH_ICON from "@/../public/assets/Icons/search.png";
// import { useRouter } from "next/navigation";
// import { useAuth } from '@/hooks/useAuth';
// import { useState } from 'react';
// import { Inter } from "next/font/google";
// import keynegatives from "@/../public/assets/Icons/keynegatives.png";
// import ResearchSearchBar from "@/components/Inputs/ResearchSearchbar";

// const inter = Inter({ weight: ["500", "700"], subsets: ["latin"] });

// const RESEARCH_CARDS_ARRAY = [
//   {
//     title: "Contextual search",
//     details: "Beyond Traditional Search \n Dive into a sophisticated semantic search experience. Find not just words, but the very essence of your inquiry within financial documents.",
//     image: SEARCH_ICON,
//     link: 'contextual-search'
//   },
//   {
//     title: "Key Negatives",
//     details: "Knowledge Beyond the Obvious \n Stay informed and vigilant with our pre-researched key negative & red alert insights. Understand the underlying challenges each company faces, even before they surface",
//     image: keynegatives,
//     link: 'key-negatives'
//   },
//   {
//     title: "Flash Report",
//     details:
//       "Analyst curated insights compilation \n Navigate the vast seas of data with our pre-researched topics on fundamental analysis. Every report is a lighthouse, guiding you towards clearer insights.",
//     image: NOTE_ICON,
//     link: 'flash-report'
//   },
//   {
//     title: "Sec GPT",
//     details:
//       "Ask|Chat|Discover \n Chat directly with financial documents, making them answer your unique, custom questions. It's an interaction like you've never experienced before.",
//     image: GPT_ICON,
//     link: 'sec-gpt'
//   },
// ];

// const Research = () => {
//   const { isAuthenticated } = useAuth();
//   const [showFlashMessage, setShowFlashMessage] = useState(false);
//   const router = useRouter();

//   const handleCardClick = () => {
//     if (!isAuthenticated()) {
//       setShowFlashMessage(true);
//       return false;  // Not authenticated
//     }
//     return true;  // Authenticated
// };


//   return (
//     <div className={`${inter.className} w-3/5 p-8 bg-[#F7F8F9] h-[92vh]`}>
//       {showFlashMessage && (
//         <div className="fixed top-0 left-0 w-full bg-red-500 text-white p-4 flex justify-between">
//           <span>Please log in first.</span>
//           <button onClick={() => setShowFlashMessage(false)}>Close</button>
//         </div>
//       )}

//       <div className="">
//         <h1 className="text-2xl text-gray-800 font-bold">
//           Research the company in the style of
//         </h1>
//         <h1 className="text-2xl text-gray-800 font-bold">
//           {'"'}
//           <span className="text-primary -tracking-2">Warren Buffet</span>
//           {'"'}
//         </h1>
//       </div>
//       {RESEARCH_CARDS_ARRAY.map((v, i) => (
//         <div className="my-5" key={i} onClick={() => { handleCardClick() && router.push(v.link) }}>
//           <ResearchCard data={v} />
//         </div>
//       ))}
//     </div>
//   );
// };

// export default Research;
