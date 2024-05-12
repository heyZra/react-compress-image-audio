import { Image, MusicNote } from "@mui/icons-material";
// import { useState, useEffect } from "react";

const ToggleThemeButton = (props) => {
  const { toggleTheme, isMusicMode } = props;

  return (
    <button
      className={`w-20 h-10 rounded-full bg-white border flex items-center transition duration-300 focus:outline-none shadow mb-2`}
      onClick={toggleTheme}
    >
      <div
        className={`w-10 h-10 relative rounded-full content-center transition duration-500 transform p-1 text-white ${
          isMusicMode
            ? "bg-gray-700 translate-x-full"
            : "bg-gray-400 -translate-x-2"
        }`}
      >
        {!isMusicMode ? <Image /> : <MusicNote />}
      </div>
    </button>
  );
};

export default ToggleThemeButton;
