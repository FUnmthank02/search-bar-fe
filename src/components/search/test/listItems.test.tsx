import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ListItems from "../listItems";
import "@testing-library/jest-dom";

describe("ListItems Component", () => {
  const mockOnSelect = jest.fn();
  const mockItems = [["Item 1"], ["Item 2"], ["Item 3"]];

  test("renders ListItems with given items", () => {
    render(
      <ListItems
        items={mockItems}
        selectedIndex={null}
        onSelect={mockOnSelect}
      />
    );

    mockItems.forEach((item) => {
      expect(screen.getByText(item[0])).toBeInTheDocument();
    });
  });

  test("triggers onSelect when an item is clicked", async () => {
    render(
      <ListItems
        items={mockItems}
        selectedIndex={null}
        onSelect={mockOnSelect}
      />
    );

    const itemElement = screen.getByText("Item 1");
    await userEvent.click(itemElement);

    expect(mockOnSelect).toHaveBeenCalledWith("Item 1", 0);
  });

  test("does not render any items when the list is empty", () => {
    render(<ListItems items={[]} selectedIndex={null} onSelect={mockOnSelect} />);
  
    expect(screen.queryByRole("listitem")).not.toBeInTheDocument();
  });
  
});
