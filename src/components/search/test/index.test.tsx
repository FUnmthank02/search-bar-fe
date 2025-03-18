import { render, screen, fireEvent, act } from "@testing-library/react";
import WrapSearch from "../index";
import {
  FetchData,
  FetchSuggestionData,
} from "../../../services/search.service";
import "@testing-library/jest-dom";

jest.mock("../../../services/search.service", () => ({
  FetchData: jest.fn(),
  FetchSuggestionData: jest.fn(),
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
});
