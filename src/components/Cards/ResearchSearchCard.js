import { useRouter, usePathname } from "next/navigation";

const ResearchSearchCard = ({ data, index, onSelect }) => {
  const router = useRouter();
  const pathname = usePathname();
  return (
    <div
      onClick={() => {
        router.push(pathname+"#selected", {data});
        onSelect(data);
      }}
      className="flex gap-2 border p-5 flex-row m-4 rounded-md cursor-pointer hover:shadow-lg"
    >
      <div>{index + 1}.</div>
      <div className="felx flex-col gap-2">
        {data.map((v, i) => (
          <p
            key={i + "searcc-p"}
            className={`${
              v?.Type == "similar_sentences" ? "bg-[#FFFF07]" : ""
            } text-gray-800 font-medium text-base leading-8 -tracking-2`}
          >
            {v?.["Cleaned Sentence"]}
          </p>
        ))}
      </div>
    </div>
  );
};
export default ResearchSearchCard;
