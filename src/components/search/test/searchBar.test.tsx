import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import SearchBar from "../searchBar";
import "@testing-library/jest-dom";
import React, { act } from "react";
import Input from "../../common/input";

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

  it("should call onSearch when debouncedSearchValue is longer than 2 characters", () => {
    jest.useFakeTimers();
    const onSearchMock = jest.fn();

    render(<Input onSearch={onSearchMock} />);
    const input = screen.getByRole("textbox");

    fireEvent.change(input, { target: { value: "tes" } });

    act(() => {
      jest.advanceTimersByTime(500);
    });

    expect(onSearchMock).toHaveBeenCalledWith("tes", false);
  });

  jest.spyOn(React, "useRef").mockReturnValue({ current: true });

  it("should prevent search when Enter is pressed if isSelectingRef is true", () => {
    const onSearchMock = jest.fn();

    render(<Input onSearch={onSearchMock} />);
    const input = screen.getByRole("textbox");

    fireEvent.keyDown(input, { key: "Enter" });

    expect(onSearchMock).not.toHaveBeenCalled();
  });

  it("should clear input and call onSearch with empty string when clear button is clicked", () => {
    const onSearchMock = jest.fn();

    render(<Input onSearch={onSearchMock} />);
    const input = screen.getByRole("textbox");

    fireEvent.change(input, { target: { value: "test" } });

    const clearButton = screen.getByText("✕");
    fireEvent.click(clearButton);

    expect(input).toHaveValue("");
    expect(onSearchMock).toHaveBeenCalledWith("", false);
  });

  it("should trigger onSearch when search button is clicked", () => {
    const onSearchMock = jest.fn();

    render(<Input onSearch={onSearchMock} />);
    const input = screen.getByRole("textbox");
    fireEvent.change(input, { target: { value: "test" } });

    const searchButton = screen.getByText("Search");
    fireEvent.click(searchButton);

    expect(onSearchMock).toHaveBeenCalledWith("test", true);
  });

  it("should select a suggestion and trigger onSearch when Enter is pressed", () => {
    const onSearchMock = jest.fn();
    render(
      <SearchBar
        onSearch={onSearchMock}
        suggestion={["Apple", "Banana"]}
        searchValue=""
      />
    );
  
    const input = screen.getByRole("textbox");
  
    // Simulate ArrowDown to select "Apple"
    fireEvent.keyDown(input, { key: "ArrowDown" });
  
    // Simulate Enter key press
    fireEvent.keyDown(input, { key: "Enter" });
  
    // onSearch should be called with the selected item
    expect(onSearchMock).toHaveBeenCalledWith("Apple", true);
  });
  
  it("should prevent search when isSelectingRef is true", () => {
    const onSearchMock = jest.fn();
    render(
      <SearchBar
        onSearch={onSearchMock}
        suggestion={["Apple"]}
        searchValue=""
      />
    );
  
    const input = screen.getByRole("textbox");
  
    // Simulate selection by pressing Enter
    fireEvent.keyDown(input, { key: "ArrowDown" });
    fireEvent.keyDown(input, { key: "Enter" });
  
    // Manually trigger input change
    fireEvent.change(input, { target: { value: "Apple" } });
  
    // Ensure onSearch was NOT called again
    expect(onSearchMock).toHaveBeenCalledTimes(1); // Only the Enter key should trigger it
  });
  
  
});
