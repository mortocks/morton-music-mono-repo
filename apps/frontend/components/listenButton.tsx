const BASE_CLASS = "bg-orange-500 w-[3px] flex animate-grow-shrink";

const ListenButton = () => (
  <button
    role="button"
    className="text-white flex space-x-3 items-center hover:text-orange-500"
  >
    <div className=" h-4 flex space-x-[5px] justify-between items-end">
      <span className={`${BASE_CLASS}`} />
      <span className={`${BASE_CLASS} animate-delay-100`} />
      <span className={`${BASE_CLASS} animate-delay-150`} />
    </div>
    <span>Listen</span>
  </button>
);

export default ListenButton;
