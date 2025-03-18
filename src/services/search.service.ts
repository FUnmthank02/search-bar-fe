import { API } from "../api/api";
import { QueryParams, ResultItem, Suggestion } from "../interfaces";

export const FetchData = async () => {
  try {
    const response = await API.search();
    return response || {};
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

export const SearchData = (data: ResultItem[], query: QueryParams) => {
  const { page, pageSize, searchValue } = query;
  const lowerCaseSearch = searchValue.toLowerCase();

  // Filter ResultItems based on case-insensitive search in DocumentTitle or DocumentExcerpt
  const filteredResults = data.filter(
    (item) =>
      item.DocumentTitle.Text.toLowerCase().includes(lowerCaseSearch) ||
      item.DocumentExcerpt.Text.toLowerCase().includes(lowerCaseSearch)
  );

  // Paginate results
  const startIndex = (page - 1) * pageSize;
  const paginatedResults = filteredResults.slice(
    startIndex,
    startIndex + pageSize
  );
  
  return {
    TotalNumberOfResults: filteredResults.length,
    Page: page,
    PageSize: pageSize,
    ResultItems: paginatedResults,
  };
};

export const FetchSuggestionData = async () => {
  try {
    const response = await API.suggestion();
    return response || {};
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

export const GetSuggestion = (suggestion: Suggestion, searchValue: string) => {
  const lowerCaseSearch = searchValue.toLowerCase();
  if (suggestion?.stemmedQueryTerm.toLowerCase().includes(lowerCaseSearch)) {
    return suggestion.suggestions;
  }
  return []
}