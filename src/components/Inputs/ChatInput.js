import { useState } from "react";
import { FiSearch } from "react-icons/fi";
import PLANE_ICON from "@/../public/assets/Icons/PaperPlaneRight.svg";
import Image from "next/image";
const ChatInput = ({ addToChat, loading }) => {
  const [chatText, setChatText] = useState("");
  const handleSearch = () => {
    console.log("clicked", chatText);
    // se
    if (chatText.length < 3) return;
    addToChat(chatText);
    setChatText("");
  };
  return (
    <div className="flex h-[50px] items-center px-2 border border-primary rounded-md w-full shadow-sm shadow-primary">
      <input
        value={chatText}
        type="text"
        className="w-full outline-none border-none pl-2 placeholder-gray-600 text-bold "
        placeholder="Type your question here"
        onChange={(e) => setChatText(e.target.value)}
        onKeyDown={(event) => {
          if (event.key == "Enter") handleSearch();
        }}
        disabled={loading}
      />
      <Image
        src={PLANE_ICON}
        onClick={handleSearch}
        className="w-[24px] h-[24px]"
      />
    </div>
  );
};

export default ChatInput;
