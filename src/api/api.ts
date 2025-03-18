import AxiosInstance from "../configs/axios";
import { SearchResponse, SuggestionResponse } from "../interfaces";
import { ENDPOINT_API } from "../utils/enums";

export const API = {
  search: (): Promise<SearchResponse> => AxiosInstance.get(ENDPOINT_API.SEARCH),
  suggestion: (): Promise<SuggestionResponse> => AxiosInstance.get(ENDPOINT_API.SUGGESTION),
}