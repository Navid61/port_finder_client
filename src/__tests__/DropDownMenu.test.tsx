import { render, screen, fireEvent } from "@testing-library/react";
import DropDownMenu from "@/components/DropDownMenu";

describe("DropDownMenu Component", () => {
  const mockItems = [
    { _id: "1", name: "Item 1" },
    { _id: "2", name: "Item 2" },
    { _id: "3", name: "Item 3" },
  ];

  const mockOnSelect = jest.fn();
  const mockSelectedIds: string[] = [];

  afterEach(() => {
    jest.clearAllMocks(); // Clear mock function calls after each test
  });

  it("renders the dropdown with placeholder text", () => {
    render(
      <DropDownMenu
        items={mockItems}
        onSelect={mockOnSelect}
        selectedIds={mockSelectedIds}
        placeholder="Select an item"
      />
    );

    // Verify placeholder text is displayed as button text
    expect(screen.getByText("Select an item")).toBeInTheDocument();
  });

  it("toggles the dropdown menu when the button is clicked", () => {
    render(
      <DropDownMenu
        items={mockItems}
        onSelect={mockOnSelect}
        selectedIds={mockSelectedIds}
        placeholder="Select an item"
      />
    );

    const button = screen.getByText("Select an item");

    // Open the dropdown
    fireEvent.click(button);
    expect(screen.getByRole("textbox")).toBeInTheDocument();

    // Close the dropdown
    fireEvent.click(button);
    expect(screen.queryByRole("textbox")).not.toBeInTheDocument();
  });

  it("filters items based on search input", () => {
    render(
      <DropDownMenu
        items={mockItems}
        onSelect={mockOnSelect}
        selectedIds={mockSelectedIds}
        placeholder="Select an item"
      />
    );

    // Open the dropdown
    fireEvent.click(screen.getByText("Select an item"));

    // Type "Item 2" in the search box
    const searchInput = screen.getByRole("textbox");
    fireEvent.change(searchInput, { target: { value: "Item 2" } });

    // Only "Item 2" should be displayed
    expect(screen.getByText("Item 2")).toBeInTheDocument();
    expect(screen.queryByText("Item 1")).not.toBeInTheDocument();
    expect(screen.queryByText("Item 3")).not.toBeInTheDocument();
  });

  it("calls onSelect when an item is selected", () => {
    render(
      <DropDownMenu
        items={mockItems}
        onSelect={mockOnSelect}
        selectedIds={mockSelectedIds}
        placeholder="Select an item"
      />
    );

    // Open the dropdown
    fireEvent.click(screen.getByText("Select an item"));

    // Click the checkbox for "Item 1"
    const checkbox = screen.getByLabelText("Item 1");
    fireEvent.click(checkbox);

    // Verify the callback was called with the correct ID
    expect(mockOnSelect).toHaveBeenCalledWith("1");
  });

  it("displays 'No results found' when no items match the search term", () => {
    render(
      <DropDownMenu
        items={mockItems}
        onSelect={mockOnSelect}
        selectedIds={mockSelectedIds}
        placeholder="Select an item"
      />
    );

    // Open the dropdown
    fireEvent.click(screen.getByText("Select an item"));

    // Type a non-matching search term
    fireEvent.change(screen.getByRole("textbox"), {
      target: { value: "Non-existent" },
    });

    // Verify "No results found" message is displayed
    expect(screen.getByText("No results found")).toBeInTheDocument();
  });
});
