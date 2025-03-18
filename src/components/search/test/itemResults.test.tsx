import { render, screen } from "@testing-library/react";
import ListResults from "../listResults";
import { SearchResponse } from "../../../interfaces";
import "@testing-library/jest-dom";

describe("ListResults Component", () => {
  const mockResult: SearchResponse = {
    TotalNumberOfResults: 20,
    Page: 1,
    PageSize: 5,
    ResultItems: [
      {
        DocumentId: "1",
        DocumentTitle: { Text: "Title 1", Highlights: [] },
        DocumentExcerpt: { Text: "Excerpt 1", Highlights: [] },
        DocumentURI: "http://example.com/1",
      },
      {
        DocumentId: "2",
        DocumentTitle: { Text: "Title 2", Highlights: [] },
        DocumentExcerpt: { Text: "Excerpt 2", Highlights: [] },
        DocumentURI: "http://example.com/2",
      },
    ],
  };

  test("renders search results correctly", () => {
    render(
      <ListResults
        result={mockResult}
        total={mockResult.TotalNumberOfResults}
        isSearching={true}
      />
    );

    expect(screen.getByText("Showing 1 - 5 of 20 results")).toBeInTheDocument();
    expect(screen.getByText("Title 1")).toBeInTheDocument();
    expect(screen.getByText("Title 2")).toBeInTheDocument();
  });

  test("shows 'No results found' when there are no results", () => {
    const emptyResult: SearchResponse = {
      TotalNumberOfResults: 0,
      Page: 1,
      PageSize: 5,
      ResultItems: [],
    };

    render(<ListResults result={emptyResult} total={0} isSearching={true} />);

    expect(screen.getByText("No results found")).toBeInTheDocument();
  });

  test("does not render when isSearching is false", () => {
    render(
      <ListResults
        result={mockResult}
        total={mockResult.TotalNumberOfResults}
        isSearching={false}
      />
    );

    expect(
      screen.queryByText("Showing 1 - 5 of 20 results")
    ).not.toBeInTheDocument();
  });
});
