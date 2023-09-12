import { useState, useEffect } from 'react';
import gifPath from "./animation.gif";
import Image from "next/image";

const ANIME = () => {
  const [showGif, setShowGif] = useState(true);

  useEffect(() => {
    const gifDuration = 40000; // Adjust this based on your GIF's duration
    const timer = setTimeout(() => {
      setShowGif(false);
    }, gifDuration);

    // Cleanup timer when component is unmounted
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="mt-12 sm:mt-0 sm:w-[90%] bg-white text-black sm:px-9 sm:pt-9 h-full mx-auto">
      {showGif && (
        <Image
          id="yourGifId"
          src={gifPath}
          alt="explanation gif"
          loading="lazy"
          objectFit="contain"
          className="w-full sm:h-[65vh] object-contain"
          style={{ maxWidth: "unset", }}
        />
      )}
    </div>
  );
};

export default ANIME;

