import gifPath from "./animation_explanation.gif";
import Image from "next/image";

const AAPL = () => {
  return (
    <div className="w-[40%] bg-white  text-black p-9  h-[120vh]">
      <Image
        src={gifPath}
        alt="explanation gif"
        loading="lazy"
        className="w-full h-[80vh] object-contain"
        style={{maxWidth: "unset", }}
      />
    </div>
  );
};

export default AAPL;
