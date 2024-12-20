import React, { useState, useRef, useEffect } from "react";
import {
  DropdownContainer,
  DropdownButton,
  DropdownList,
  DropdownItem,
  NoResultsMessage,
  SearchInput,
} from "./DropDownMenu.styles";

interface DropDownMenuProps {
  items: { _id: string; name: string }[]; // Array of items
  onSelect: (_id: string) => void; // Callback when an item is selected
  selectedIds: string[]; // IDs of currently selected items
  placeholder: string; // Placeholder for the search bar
}

const DropDownMenu: React.FC<DropDownMenuProps> = ({
  items,
  onSelect,
  selectedIds,
  placeholder,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const filteredItems = items.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Handle clicks outside the dropdown to close it
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <DropdownContainer ref={dropdownRef}>
      <DropdownButton onClick={() => setDropdownOpen(!dropdownOpen)}>
        {placeholder}
        <span>{dropdownOpen ? "▲" : "▼"}</span>
      </DropdownButton>
      {dropdownOpen && (
        <DropdownList>
          <SearchInput
            type="text"
            placeholder={placeholder}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          {filteredItems.length > 0 ? (
            filteredItems.map((item) => (
              <DropdownItem key={item._id}>
                <label>
                  <input
                    type="checkbox"
                    checked={selectedIds.includes(item._id)}
                    onChange={() => onSelect(item._id)}
                  />
                  {item.name}
                </label>
              </DropdownItem>
            ))
          ) : (
            <NoResultsMessage>No results found</NoResultsMessage>
          )}
        </DropdownList>
      )}
    </DropdownContainer>
  );
};

export default DropDownMenu;
