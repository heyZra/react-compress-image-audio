const Modals = (props) => {
  const { isOpen, onClose, children } = props;
  if (!isOpen) return null;
  return (
    <>
      <div
        className="h-screen w-screen absolute flex justify-center text-center items-center bg-black bg-opacity-50 backdrop-filter backdrop-blur-sm"
        onClick={onClose}
      >
        <div
          className="max-w-xs w-full h-fit bg-white p-3 rounded-xl flex flex-col"
          onClick={(event) => event.stopPropagation()}
        >
          {children}
        </div>
      </div>
    </>
  );
};

export default Modals;
