interface Highlight {
  BeginOffset: number;
  EndOffset: number;
}

interface DocumentText {
  Text: string;
  Highlights: Highlight[];
}

export interface ResultItem {
  DocumentId: string;
  DocumentTitle: DocumentText;
  DocumentExcerpt: DocumentText;
  DocumentURI: string;
}

export interface SearchResponse {
  TotalNumberOfResults: number;
  Page: number;
  PageSize: number;
  ResultItems: ResultItem[];
}

export interface SuggestionResponse {
  stemmedQueryTerm: string;
  suggestions: string[];
}

export interface QueryParams {
  page: number;
  pageSize: number;
  searchValue: string;
}

export interface Pagination {
  page: number;
  pageSize: number;
  total: number;
}