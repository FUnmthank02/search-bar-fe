import React, { useState } from "react";
import Button from "./button";
import { Search as SearchIcon } from 'lucide-react';
// import debounce from "lodash.debounce";

interface InputProps {
  placeholder?: string;
  value?: string;
  onClear?: () => void;
  onSearch?: (query: string) => void;
}

const Input: React.FC<InputProps> = ({
  placeholder = "Search...",
  value,
  onSearch,
}) => {
  const [inputValue, setInputValue] = useState("");
  // const debouncedSearch = useCallback(
  //   debounce((query: string) => {
  //     onSearch?.(query);
  //   }, 500),
  //   []
  // );
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    // debouncedSearch(e.target.value);
  };

  const handleClear = () => {
    setInputValue("");
  }
  return (
    <div className="flex items-center border border-blue-400  rounded-t-lg rounded-br-lg overflow-hidden w-full">
      {/* Input Field */}
      <input
        type="text"
        className="text-stone-900 flex-1 px-4 py-2 outline-none rounded-t-lg rounded-br-lg"
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        onKeyDown={(e) => e.key === "Enter" && onSearch?.(inputValue)}
      />

      {/* Clear Button (❌) */}
      {value && (
        <Button onClick={handleClear} className="px-2 text-gray-500 cursor-pointer font-bold">
          ✕
        </Button>
      )}

      <Button onClick={() => onSearch?.(inputValue)} className="flex gap-2 items-center cursor-pointer text-white bg-blue-500 hover:bg-blue-600 transition rounded-lg">
        <SearchIcon size={16}/> Search
      </Button>
    </div>
  );
};

export default Input;
