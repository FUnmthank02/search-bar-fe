import React from "react";
import Input from "../common/input";

interface SearchBarProps {
  onSearch: (searchValue: string) => void;
}
const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  return (
    <>
      <section className="flex flex-col w-full h-full px-[10%]">
        <section className="h-full w-full flex items-center">
          <Input onSearch={onSearch} />
        </section>
        <section className="w-[90%] shadow-lg shadow-gray-200  rounded-b-lg bg-white">
          {/* <ListItems items={[...currentData]} /> */}
        </section>
      </section>
    </>
  );
};

export default SearchBar;
