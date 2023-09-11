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
    <div className="w-[90%] bg-white text-black p-9 h-[65vh]">
      {showGif && (
        <Image
          id="yourGifId"
          src={gifPath}
          alt="explanation gif"
          loading="lazy"
          objectFit="contain"
          className="w-full h-[65vh] object-contain"
          style={{maxWidth: "unset", }}
        />
      )}
    </div>
  );
};

export default ANIME;

