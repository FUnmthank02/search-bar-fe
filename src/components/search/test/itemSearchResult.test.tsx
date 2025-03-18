import { render, screen } from "@testing-library/react";
import ItemSearchResult from "../itemSearchResult";
import { ResultItem } from "../../../interfaces";
import "@testing-library/jest-dom";

jest.mock("../../../utils/helpers", () => ({
  getText: jest.fn((text) => text), // Mocking getText to return the text as is
}));

describe("ItemSearchResult Component", () => {
  const mockData: ResultItem = {
    DocumentId: "12345", // Add a unique identifier
    DocumentTitle: { Text: "Test Title", Highlights: [] },
    DocumentExcerpt: { Text: "This is a test excerpt.", Highlights: [] },
    DocumentURI: "https://example.com",
  };
  

  it("renders the item correctly", () => {
    render(<ItemSearchResult data={mockData} />);

    expect(screen.getByText("Test Title")).toBeInTheDocument();
    expect(screen.getByText("This is a test excerpt.")).toBeInTheDocument();
    expect(screen.getByText("https://example.com")).toBeInTheDocument();
  });

  it("applies the correct styles", () => {
    render(<ItemSearchResult data={mockData} />);

    const titleElement = screen.getByText("Test Title");
    expect(titleElement).toHaveClass("text-xl text-blue-500 uppercase my-1");

    const excerptElement = screen.getByText("This is a test excerpt.");
    expect(excerptElement).toHaveClass(
      "text-sm text-gray-700 line-clamp-2 my-1"
    );

    const linkElement = screen.getByText("https://example.com");
    expect(linkElement).toHaveClass(
      "text-xs text-gray-500 my-1 hover:underline hover:text-blue-400"
    );
  });

  it("renders an anchor tag for the document URI", () => {
    render(<ItemSearchResult data={mockData} />);

    const linkElement = screen.getByText("https://example.com");
    expect(linkElement.tagName).toBe("A");
    expect(linkElement).toHaveAttribute("target", "_blank");
  });
});
