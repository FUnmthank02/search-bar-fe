import { render, screen, fireEvent, act } from "@testing-library/react";
import WrapSearch from "../index";
import {
  FetchData,
  FetchSuggestionData,
  GetSuggestion,
  SearchData,
} from "../../../services/search.service";
import "@testing-library/jest-dom";
import React from "react";

jest.mock("../../../hooks/useDebounce", () => ({
  __esModule: true,
  default: jest.fn(() => ""),
}));

jest.mock("../../../services/search.service", () => ({
  FetchData: jest.fn(() =>
    Promise.resolve({
      TotalNumberOfResults: 100,
      Page: 1,
      PageSize: 10,
      ResultItems: [{ id: 1, name: "Test Item" }], // Ensure this is an array
    })
  ),
  FetchSuggestionData: jest.fn(() =>
    Promise.resolve({
      stemmedQueryTerm: "",
      suggestions: [],
    })
  ),
  GetSuggestion: jest.fn(() => []),
  SearchData: jest.fn(() => ({
    TotalNumberOfResults: 1,
    Page: 1,
    PageSize: 10,
    ResultItems: [{ id: 2, name: "Searched Item" }],
  })),
}));

describe("WrapSearch Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders WrapSearch component", async () => {
    (FetchData as jest.Mock).mockResolvedValue({
      TotalNumberOfResults: 5,
      Page: 1,
      PageSize: 10,
      ResultItems: [{ id: 1, title: "Test Result" }],
    });

    (FetchSuggestionData as jest.Mock).mockResolvedValue({
      stemmedQueryTerm: "test",
      suggestions: ["test1", "test2"],
    });

    await act(async () => {
      render(<WrapSearch />);
    });

    expect(await screen.findByRole("textbox")).toBeInTheDocument();
  });

  it("updates search value on input change", async () => {
    await act(async () => {
      render(<WrapSearch />);
    });

    const input = screen.getByRole("textbox");

    fireEvent.change(input, { target: { value: "example" } });
    expect(input).toHaveValue("example");
  });

  it("clears suggestions when input is empty", async () => {
    (GetSuggestion as jest.Mock).mockReturnValue(["test1", "test2"]);

    await act(async () => {
      render(<WrapSearch />);
    });

    const input = screen.getByRole("textbox");
    fireEvent.change(input, { target: { value: "" } });

    expect(screen.queryByText("test1")).not.toBeInTheDocument();
    expect(screen.queryByText("test2")).not.toBeInTheDocument();
  });

  it("triggers search when pressing Enter", async () => {
    (SearchData as jest.Mock).mockReturnValue({
      TotalNumberOfResults: 1,
      Page: 1,
      PageSize: 10,
      ResultItems: [{ id: 1, title: "Search Result" }],
    });

    await act(async () => {
      render(<WrapSearch />);
    });

    const input = screen.getByRole("textbox");
    fireEvent.change(input, { target: { value: "query" } });
    fireEvent.keyDown(input, { key: "Enter", code: "Enter" });

    expect(SearchData).toHaveBeenCalled();
  });

  it("displays no results when search has no matches", async () => {
    (SearchData as jest.Mock).mockReturnValue({
      TotalNumberOfResults: 0,
      Page: 1,
      PageSize: 10,
      ResultItems: [],
    });

    await act(async () => {
      render(<WrapSearch />);
    });

    const input = screen.getByRole("textbox");
    fireEvent.change(input, { target: { value: "unknown" } });
    fireEvent.keyDown(input, { key: "Enter", code: "Enter" });

    expect(await screen.findByText("No results found")).toBeInTheDocument();
  });

  it("should clear suggestions when query is empty", () => {
    const setCurrentSuggestion = jest.fn();
    jest.spyOn(React, "useState").mockReturnValue([[], setCurrentSuggestion]);

    const { getByRole } = render(<WrapSearch />);
    const input = getByRole("textbox");

    fireEvent.change(input, { target: { value: "" } });

    expect(setCurrentSuggestion).toHaveBeenCalledWith([]);
    expect(GetSuggestion).not.toHaveBeenCalled();
  });

  it("should handle GetSuggestion returning undefined", () => {
    const setCurrentSuggestion = jest.fn();
    jest.spyOn(React, "useState").mockReturnValue([[], setCurrentSuggestion]);

    (GetSuggestion as jest.Mock).mockReturnValue(undefined);

    const { getByRole } = render(<WrapSearch />);
    const input = getByRole("textbox");

    fireEvent.change(input, { target: { value: "test" } });

    expect(setCurrentSuggestion).toHaveBeenCalledWith([]); // Fallback case
  });

  it("should clear suggestions when query is empty", async () => {
    await act(async () => {
      render(<WrapSearch />);
    });

    const input = screen.getByRole("textbox");
    fireEvent.change(input, { target: { value: "" } });

    expect(screen.queryByText("test1")).not.toBeInTheDocument();
    expect(screen.queryByText("test2")).not.toBeInTheDocument();
  });
});
