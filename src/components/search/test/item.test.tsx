import { render, screen, fireEvent } from "@testing-library/react";
import Item from "../item";
import "@testing-library/jest-dom";

describe("Item Component", () => {
  const mockOnSelect = jest.fn();

  const mockData = ["Test", <strong key="1">Bold</strong>];

  it("renders the item correctly", () => {
    render(
      <Item
        data={mockData}
        selectedIndex={null}
        index={0}
        onSelect={mockOnSelect}
      />
    );

    expect(screen.getByText("Test")).toBeInTheDocument();
  });

  it("applies selected styles when selectedIndex matches index", () => {
    render(
      <Item
        data={mockData}
        selectedIndex={0}
        index={0}
        onSelect={mockOnSelect}
      />
    );

    const itemElement = screen.getByText("Test").closest("div");
    expect(itemElement).toHaveClass("bg-gray-200");
  });

  it("calls onSelect when clicked", () => {
    render(
      <Item
        data={mockData}
        selectedIndex={null}
        index={1}
        onSelect={mockOnSelect}
      />
    );

    const itemElement = screen.getByText("Test").closest("div");
    fireEvent.click(itemElement!);

    expect(mockOnSelect).toHaveBeenCalledWith("Test", 1);
  });
});
