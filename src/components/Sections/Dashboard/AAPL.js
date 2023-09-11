import gifPath from "./animation_explanation.gif";
import Image from "next/image";

const AAPL = () => {
  return (
    <div className="md:w-2/5 bg-white text-black p-0 sm:p-4 md:p-9">
      <Image
        src={gifPath}
        alt="explanation gif"
        loading="lazy"
        className="w-full h-[80vh] object-contain"
        style={{ maxWidth: "unset", }}
      />
    </div>
  );
};

export default AAPL;
