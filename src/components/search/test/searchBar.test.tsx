import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import SearchBar from "../searchBar";
import "@testing-library/jest-dom";

describe("SearchBar Component", () => {
  const mockOnSearch = jest.fn();
  const mockSuggestions = ["React", "React Native", "Redux", "Node.js"];
  const setup = () => {
    return render(
      <SearchBar
        onSearch={mockOnSearch}
        suggestion={mockSuggestions}
        searchValue=""
      />
    );
  };

  test("renders input field correctly", () => {
    setup();
    expect(screen.getByRole("textbox")).toBeInTheDocument();
  });

  test("typing in the input field updates value", async () => {
    setup();
    const input = screen.getByRole("textbox");
    await userEvent.type(input, "React");
    expect(input).toHaveValue("React");
  });

  test("shows suggestions when typing", async () => {
    setup();
    const input = screen.getByRole("textbox");
    await userEvent.type(input, "Re");

    const suggestionItem = await screen.findByText("React");
    expect(suggestionItem).toBeInTheDocument();
  });

  test("clicking on a suggestion selects it", async () => {
    setup();
    const input = screen.getByRole("textbox");
    await userEvent.type(input, "Re");

    const suggestionItem = await screen.findByText("React");
    fireEvent.click(suggestionItem);

    expect(input).toHaveValue("React");
    expect(mockOnSearch).toHaveBeenCalledWith("React", true);
  });

  test("keyboard navigation (ArrowDown, ArrowUp, Enter) works", async () => {
    setup();
    const input = screen.getByRole("textbox");
    await userEvent.type(input, "Re");

    fireEvent.keyDown(input, { key: "ArrowDown" });
    fireEvent.keyDown(input, { key: "Enter" });

    expect(input).toHaveValue("React");
    expect(mockOnSearch).toHaveBeenCalledWith("React", true);
  });

  test("clearing input and retyping shows suggestions again", async () => {
    setup();
    const input = screen.getByRole("textbox");
    await userEvent.type(input, "Re");

    fireEvent.change(input, { target: { value: "" } });
    await userEvent.type(input, "Re");

    const suggestionItem = await screen.findByText("React");
    expect(suggestionItem).toBeInTheDocument();
  });
});
