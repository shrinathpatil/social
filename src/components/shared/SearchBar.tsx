import { Search } from "lucide-react";

const SearchBar = () => {
  return (
    <div className="hidden lg:flex gap-x-2 items-center w-full max-w-[600px] border border-gray-200 rounded-md py-2 px-4">
      <Search size={20} className="icon" />
      <input
        type="text"
        placeholder="Search"
        className="w-full h-full outline-none px-2 text-gray-700 text-sm"
      />
    </div>
  );
};

export default SearchBar;
