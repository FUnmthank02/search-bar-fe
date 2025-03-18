import React, { useEffect, useRef, useState } from "react";
import Button from "./button";
import { Search as SearchIcon } from "lucide-react";
import useDebounce from "../../hooks/useDebounce";

interface InputProps {
  placeholder?: string;
  value?: string;
  onClear?: () => void;
  onSearch?: (query: string, isSearching: boolean) => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onKeyDown?: (event: any) => void;
}

const Input: React.FC<InputProps> = ({
  placeholder = "Search...",
  onSearch,
  value,
  onKeyDown,
}) => {
  const [inputValue, setInputValue] = useState("");
  const debouncedSearchValue = useDebounce(inputValue, 500);
  const inputRef = useRef<HTMLInputElement>(null);
  const isSelectingRef = useRef(false); // Track if selection is happening

  useEffect(() => {
    if (debouncedSearchValue.trim().length > 2) {
      onSearch?.(debouncedSearchValue, false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSearchValue]);

  useEffect(() => {
    setInputValue(value || "");
  }, [value]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    console.log("handleKeyDown");

    if (onKeyDown) onKeyDown(e); // Pass key events to `SearchBar`

    if (e.key === "Enter") {
      if (isSelectingRef.current) {
        e.preventDefault();
        isSelectingRef.current = false; // Reset flag
        return; // Prevent search from triggering
      }
      onSearch?.(inputValue, true);
    }
  };

  const handleClear = () => {
    setInputValue("");
    onSearch?.("", false);
    inputRef.current?.focus();
  };

  return (
    <div className="flex items-center border border-gray-400 focus-within:border-blue-400 rounded-t-lg rounded-br-lg overflow-hidden w-full">
      {/* Input Field */}
      <input
        ref={inputRef}
        type="text"
        className="text-stone-900 flex-1 px-4 py-2 outline-none rounded-t-lg rounded-br-lg"
        placeholder={placeholder}
        value={inputValue}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
      />

      {/* Clear Button (❌) */}
      {inputValue.length >= 1 && (
        <Button
          onClick={handleClear}
          className="px-2 text-gray-500 cursor-pointer font-bold"
        >
          ✕
        </Button>
      )}

      <Button
        onClick={() => onSearch?.(inputValue, true)}
        className="flex gap-2 items-center cursor-pointer text-white border border-blue-500 bg-blue-500 hover:bg-blue-600 transition rounded-lg"
      >
        <SearchIcon size={16} /> Search
      </Button>
    </div>
  );
};

export default Input;
