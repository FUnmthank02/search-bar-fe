import { useEffect, useState } from "react";
import { SearchResponse, Suggestion } from "../../interfaces";
import ListResults from "./listResults";
import SearchBar from "./searchBar";
import {
  FetchData,
  FetchSuggestionData,
  GetSuggestion,
  SearchData,
} from "../../services/search.service";

const WrapSearch = () => {
  const [rootData, setRootData] = useState<SearchResponse>({
    TotalNumberOfResults: 0,
    Page: 0,
    PageSize: 0,
    ResultItems: [],
  });

  const [suggestion, setSuggestion] = useState<Suggestion>({
    stemmedQueryTerm: "",
    suggestions: [],
  });

  const [currentSuggestion, setCurrentSuggestion] = useState<string[]>([]);
  const [isSearching, setIsSearching] = useState<boolean>(false);
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
    await FetchSuggestionData().then((response) => {
      setSuggestion((prev) => ({ ...prev, ...response }));
    });
  };

  const handleSearch = (query: string, isSearchingData: boolean) => {
    setSearchValue(query);
    setIsSearching(isSearchingData);
    if (!isSearchingData) {
      if (query === "") {
        setCurrentSuggestion([]);
        return;
      }
      const res = GetSuggestion(suggestion, query);      
      setCurrentSuggestion(res || []);
    } else {
      const result = SearchData(rootData.ResultItems, {
        page: 1,
        pageSize: 10,
        searchValue: query,
      });
      setCurrentData(result || {});
    }
  };

  return (
    <>
      <section className="shadow-lg shadow-gray-100 h-[150px]">
        <SearchBar onSearch={handleSearch} suggestion={currentSuggestion} searchValue={searchValue} />
      </section>
      <section className="px-[10%]">
        <ListResults
          result={currentData}
          total={rootData?.TotalNumberOfResults || 0}
          isSearching={isSearching}
        />
      </section>
    </>
  );
};

export default WrapSearch;
