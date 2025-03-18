import React from "react";
import Input from "../common/input";
import ListItems from "./listItems";
import { getUniqueId } from "../../utils/helpers";

interface SearchBarProps {
  onSearch: (searchValue: string, isSearching: boolean) => void;
  suggestion: string[];
  searchValue: string;
}
const SearchBar: React.FC<SearchBarProps> = ({ onSearch, suggestion, searchValue }) => {
  const newSuggestion = React.useMemo(() => {
    return suggestion
      .map((item) => {
        // Finds all matches instead of stopping at the first one, regardless of uppercase/lowercase.
        const regex = new RegExp(`(${searchValue})`, "gi");
        const parts = item.split(regex);        
        return parts.map((part) =>
          part.toLowerCase() === searchValue.toLowerCase() ? (
            <span key={getUniqueId()} className="font-bold">{part}</span>
          ) : (
            part
          )
        );
      });
  }, [suggestion, searchValue]);
  
  return (
    <>
      <section className="w-full h-full px-[10%]">
        <section className="h-full w-full flex items-center">
          <Input onSearch={onSearch} />
        </section>
        <section className="w-[90%] relative top-[-50px] left-0 shadow-lg shadow-gray-200  rounded-b-lg bg-white transition-all">
          <ListItems items={newSuggestion} />
        </section>
      </section>
    </>
  );
};

export default SearchBar;
