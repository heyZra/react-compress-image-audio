const BoxLog = ({ clickDownload, log }) => {
  return (
    <>
      <div className="max-w-56 w-full h-1/3 bg-gray-100 border rounded-xl shadow-xl text-center p-3 block ml-10">
        <h1 className="text-sm font-bold">LOG ACTIVITY</h1>
        <div className="w-full h-2/3 border text-left rounded-xl bg-white overflow-y-auto">
          {log.map((item, index) => (
            <p className="text-sm" key={item}>{`${index + 1}. ${item}`}</p>
          ))}
        </div>
        <button
          className="bg-green-300 rounded-lg p-1 w-full font-bold text-red mt-3 hover:bg-green-400"
          onClick={clickDownload}
        >
          DOWNLOAD
        </button>
      </div>
    </>
  );
};
export default BoxLog;
