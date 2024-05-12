import { useState } from "react";

const CompressImage = ({ qualityParent, onClose, saveToParent }) => {
  const [quality, setQuality] = useState(qualityParent);

  const clickSave = () => {
    saveToParent(quality, `compressed image: ${quality}%`);
    onClose();
    console.log(quality);
  };

  const handleQualityChange = (event) => {
    setQuality(event.target.value);
  };

  return (
    <>
      <div className="flex justify-center">
        <div className="flex flex-col items-center ml-8">
          <input
            type="number"
            className="w-24 h-10 border text-2xl text-center placeholder:text-2xl placeholder:text-center"
            placeholder="--"
            value={quality}
            onChange={handleQualityChange}
          />
          <label className="text-lg font-bold">Quality</label>
        </div>
        <h1 className="text-3xl font-bold">%</h1>
      </div>
      <div className="mt-3">
        <button
          className="w-1/4 p-1 h-34 bg-red-400 rounded-lg hover:bg-red-500 cursor-pointer mr-2"
          onClick={onClose}
        >
          Close
        </button>
        <button
          className="w-1/4 p-1 h-34 bg-green-400 rounded-lg hover:bg-green-500 cursor-pointer"
          onClick={clickSave}
        >
          Save
        </button>
      </div>
    </>
  );
};

export default CompressImage;
