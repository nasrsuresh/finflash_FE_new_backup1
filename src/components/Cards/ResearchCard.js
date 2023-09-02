"use client"
import React from 'react';
import Image from "next/image";

const ResearchCard = ({ data }) => {
  return (
    <div className="flex gap-10 w-[50%]">
      <div className="max-w-unset-imp rounded-sm flex items-center justify-center">
        <Image
          src={data.image}
          alt={data.title}
          width={32}
          height={32}
        />
      </div>
      <div>
        <span className="text-primary underline font-bold text-base -tracking-2">
          {data.title}
        </span>
        <p className="text-gray-600 font-medium text-base -tracking-2 mt-4">
          {data.details}
        </p>
      </div>
    </div>
  );
};

export default ResearchCard;


// "use client"
// import React from 'react';
// import Image from "next/image";

// const ResearchCard = ({ data }) => {
//   const detailsLines = data.details.split('\n');
//   return (
//     <div className="flex gap-10 w-[50%]">
//       <div className="max-w-unset-imp rounded-sm flex items-center justify-center">
//         <Image
//           src={data.image}
//           alt={data.title}
//           width={32}
//           height={32}
//         />
//       </div>
//       <div>
//         <a
//           className="text-primary underline font-bold text-base -tracking-2"
//           href={data?.link}
//         >
//           {data.title}
//         </a>
//         <p className="text-gray-600 font-medium text-base -tracking-2 mt-4">
//           {detailsLines.map((line, index) => (
//             <React.Fragment key={index}>
//               {index === 0 ? <span className="font-bold">{line}</span> : line}
//               {/* If it's not the last line, add a <br /> for visual line break */}
//               {index !== detailsLines.length - 1 && <br />}
//             </React.Fragment>
//           ))}
//         </p>
//       </div>
//     </div>
//   );
// };

// export default ResearchCard;
