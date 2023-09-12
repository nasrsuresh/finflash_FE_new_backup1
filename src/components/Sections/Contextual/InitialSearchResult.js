"use client";
import { useState } from "react";
import { Inter } from "next/font/google";
const inter = Inter({ weight: ["500", "700"], subsets: ["latin"] });
import ResearchSearchCard from "@/components/Cards/ResearchSearchCard";

const InitialSearchResult = ({
  data,
  onDataSelect,
  label = "",
  sourceName = "2022_10K report",
}) => {

  return (
    <div
      className={`${inter.className} flex px-5 py-4 w-full bg-white border max-h-[65vh] `}
    >
      <div className="flex flex-col w-full">
        <div className="flex-col md:flex-row flex justify-center gap-8">
          <p className="text-base font-bold text-black">{label}</p>
          <p className="text-base font-bold text-black">Source: {sourceName}</p>
        </div>
        <div className="flex-1 mt-8 md:mt-0 overflow-hidden overflow-y-auto">
          {data?.map((v, i) => {
            return (
              <ResearchSearchCard
                key={i}
                data={v}
                index={i}
                onSelect={onDataSelect}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default InitialSearchResult;
