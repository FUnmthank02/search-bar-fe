import { useEffect, useState } from "react";
import { SearchResponse } from "../../interfaces";
import ListResults from "./listResults";
import SearchBar from "./searchBar";
import { FetchData, SearchData } from "../../services/search.service";

const WrapSearch = () => {
  const [rootData, setRootData] = useState<SearchResponse>({
    TotalNumberOfResults: 0,
    Page: 0,
    PageSize: 0,
    ResultItems: [],
  });

  const [searchValue, setSearchValue] = useState<string>("");

  const [currentData, setCurrentData] = useState<SearchResponse>({
    TotalNumberOfResults: 0,
    Page: 0,
    PageSize: 0,
    ResultItems: [],
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    await FetchData().then((response) => {
      setRootData((prev) => ({ ...prev, ...response }));
    });
  };

  const handleSearch = (query: string) => {
    setSearchValue(query);
    const result = SearchData(rootData.ResultItems, {
      page: 1,
      pageSize: 10,
      searchValue: query,
    });
    setCurrentData(result || {});
  };

  return (
    <>
      <section className="shadow-lg shadow-gray-100 h-[150px]">
        <SearchBar onSearch={handleSearch} />
      </section>
      <section className="px-[10%]">
        <ListResults
          result={currentData}
          total={rootData?.TotalNumberOfResults || 0}
          isSearching={searchValue.trim() !== ""}
        />
      </section>
    </>
  );
};

export default WrapSearch;
