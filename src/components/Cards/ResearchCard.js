"use client"
import React from 'react';
import Image from "next/image";

const ResearchCard = ({ data, titleClass }) => {
  return (
    <div className="flex gap-4 sm:gap-10 md:w-1/2 relative h-full">
      <div className="max-w-unset-imp rounded-sm flex items-start md:items-center justify-center">
        <Image
          src={data.image}
          alt={data.title}
          width={32}
          height={32}
        />
      </div>
      <div>
        <span className={`text-primary underline font-bold text-base -tracking-2 ${titleClass}`}>
          {data.title}
        </span>
        {/* Splitting and rendering the details string inline */}
        <div className="text-gray-600 font-medium text-base -tracking-2 mt-4">
          {data.details.split('\n').map((line, index) => (
            <React.Fragment key={index}>
              {index === 0 ? <span className="font-bold">{line}</span> : line}
              {index !== data.details.split('\n').length - 1 && <br />}
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ResearchCard;

// previous code


// "use client"
// import React from 'react';
// import Image from "next/image";

// const ResearchCard = ({ data }) => {
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
//         <span className="text-primary underline font-bold text-base -tracking-2">
//           {data.title}
//         </span>
//         <p className="text-gray-600 font-medium text-base -tracking-2 mt-4">
//           {data.details}
//         </p>
//       </div>
//     </div>
//   );
// };

// export default ResearchCard;




