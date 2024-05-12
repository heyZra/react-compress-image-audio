import { CloudUploadOutlined } from "@mui/icons-material";
import ToggleThemeButton from "./ToggleThemeButton";
import { useEffect, useRef, useState } from "react";
import Modals from "./Modals";
import ResizeImage from "./Menu/ResizeImage";
import CompressImage from "./Menu/CompressImage";
import RotateImage from "./Menu/RotateImage";
import CompressAudio from "./Menu/CompressAudio";
import handleImages from "./utils/handleImages";
import BoxLog from "./BoxLog";
import handleCompressAudio from "./utils/handleCompressAudio";

const App = () => {
  const [modal, setModal] = useState(false);
  let [menu, setMenu] = useState(null);
  let [widthImage, setWidthImage] = useState(null);
  let [heightImage, setHeightImage] = useState(null);
  const [isMusicMode, setIsMusicMode] = useState(false);
  const [fileSrc, setfileSrc] = useState(null);
  const [image, setImage] = useState(null);
  const [music, setMusic] = useState(null);
  const [quality, setQuality] = useState(100); //default 100%
  const [rotate, setRotate] = useState(0); //default 0 derajat
  const [percentageAudio, setPercentageAudio] = useState(100); //default 100%
  const [logArray] = useState([]);
  const uploadRef = useRef(null);

  useEffect(() => {
    const clickHandler = (event) => {
      const file = event.target.files[0];
      if (!isMusicMode) {
        if (!image) {
          // for image
          const img = new Image();
          img.src = URL.createObjectURL(file);
          setfileSrc(URL.createObjectURL(file));
          img.onload = () => {
            setWidthImage(img.naturalWidth);
            setHeightImage(img.naturalHeight);
          };
          setImage(img);
          console.log("set image");
        }
      } else {
        setMusic(file);
        setfileSrc(true);
        console.log("set music");
        console.log(file);
      }
      console.log("succed click upload");
    };

    if (uploadRef.current) {
      uploadRef.current.addEventListener("change", clickHandler);
    }

    return () => {
      if (uploadRef.current) {
        uploadRef.current.removeEventListener("change", clickHandler);
      }
    };
  }, [image, music, quality, rotate, logArray, isMusicMode, percentageAudio]);

  const handleBoxClick = () => {
    if (uploadRef.current) {
      uploadRef.current.click();
    }
  };

  const toggleTheme = () => {
    const newMode = !isMusicMode;
    setIsMusicMode(newMode);
    //delete all and can choose image again
    setfileSrc(null);
    setHeightImage(null);
    setWidthImage(null);
    setImage(null);
    setMenu(null);
    setQuality(100);
    setRotate(0);
    setPercentageAudio(100);
    // localStorage.setItem("isMusicMode", newMode);
  };

  const handleClose = () => {
    setModal(false);
  };
  const handleMenu = (menu) => {
    setMenu(menu);
    setModal(true);
  };
  const handleSaveWidthHeight = (width, height, log) => {
    setWidthImage(width);
    setHeightImage(height);
    logArray.push(log);
    console.log(widthImage, heightImage, "app");
  };
  const handleSavedQuality = (quality, log) => {
    setQuality(quality);
    logArray.push(log);
    console.log(quality);
  };
  const handleSavedRotate = (deg, log) => {
    logArray.push(log);
    setRotate(deg);
    console.log(rotate);
  };
  const handleSavedPercentageAudio = (percentage, log) => {
    logArray.push(log);
    setPercentageAudio(percentage);
    console.log(percentage);
  };

  const clickDownload = () => {
    if (image !== null && image !== undefined) {
      handleImages(image, widthImage, heightImage, quality, rotate);
      console.log("download image");
    } else if (music !== null && music !== undefined) {
      handleCompressAudio({ music, percentageAudio });
      console.log("download music");
    } else {
      setModal(true);
      <Modals isOpen={modal} onClose={handleClose}>
        <h1>Choose File First</h1>
      </Modals>;
    }
  };

  return (
    <>
      <div className="w-screen h-screen flex justify-center">
        <div className="content-center">
          <ToggleThemeButton
            toggleTheme={toggleTheme}
            isMusicMode={isMusicMode}
          />
          <div
            className="max-w-lg w-screen h-2/5 bg-white border rounded-xl shadow-xl text-center content-center cursor-pointer"
            onClick={handleBoxClick}
          >
            {fileSrc ? (
              !isMusicMode ? (
                <div className="h-full w-full flex p-2 flex justify-center">
                  <img
                    src={fileSrc}
                    alt="uploaded"
                    className={`max-w-full max-h-full  p-5 transform rotate-[${rotate}deg]`}
                  ></img>
                </div>
              ) : (
                <div className="h-full w-full flex p-2 justify-center items-center">
                  <h1 className="font-bold text-sm">
                    {music ? music.name : ""}
                  </h1>
                </div>
              )
            ) : (
              <>
                <input
                  type="file"
                  ref={uploadRef}
                  accept={!isMusicMode ? "image/*" : "audio/mpeg"}
                  className="hidden"
                />
                <CloudUploadOutlined style={{ fontSize: 90 }} />
                <h1 className="text-xl font-bold">
                  Choose{" "}
                  <span className="underline underline-offset-4">
                    {!isMusicMode ? "Image" : "Audio"}
                  </span>{" "}
                  File to Upload
                </h1>
              </>
            )}
          </div>
          <div className="mt-5 flex gap-5 justify-center">
            {!isMusicMode ? (
              <>
                <h1
                  className="font-bold cursor-pointer hover:text-xl transition-all duration-300"
                  onClick={() => handleMenu("resize")}
                >
                  Resize
                </h1>
                <h1
                  className="font-bold cursor-pointer hover:text-xl transition-all duration-300"
                  onClick={() => handleMenu("compress")}
                >
                  Compress
                </h1>
                <h1
                  className="font-bold cursor-pointer hover:text-xl transition-all duration-300"
                  onClick={() => handleMenu("rotate")}
                >
                  Rotate
                </h1>
              </>
            ) : (
              <h1
                className="font-bold cursor-pointer hover:text-xl transition-all duration-300"
                onClick={() => handleMenu("compress-audio")}
              >
                Compress
              </h1>
            )}
          </div>
        </div>
        <Modals isOpen={modal} onClose={handleClose}>
          {image && !isMusicMode && (
            <>
              {menu === "resize" && (
                <ResizeImage
                  height={heightImage}
                  width={widthImage}
                  onClose={handleClose}
                  image={image}
                  saveToParent={handleSaveWidthHeight}
                />
              )}
              {menu === "compress" && (
                <CompressImage
                  qualityParent={quality}
                  onClose={handleClose}
                  saveToParent={handleSavedQuality}
                />
              )}
              {menu === "rotate" && (
                <RotateImage
                  parentRotate={rotate}
                  onClose={handleClose}
                  saveToParent={handleSavedRotate}
                />
              )}
            </>
          )}
          {music && isMusicMode && (
            <>
              {menu === "compress-audio" && (
                <CompressAudio
                  onClose={handleClose}
                  percentageAudio={percentageAudio}
                  saveToParent={handleSavedPercentageAudio}
                />
              )}
            </>
          )}
          {!image && !music && <h1>Choose File First</h1>}
        </Modals>
        <div className="h-full content-center">
          <BoxLog clickDownload={clickDownload} log={logArray} />
        </div>
      </div>
    </>
  );
};

export default App;
