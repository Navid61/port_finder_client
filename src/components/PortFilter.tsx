import React, { useState, useEffect, useRef } from "react";
import {
  Container,
  Header,
  DropdownContainer,
  DropdownButton,
  DropdownList,
  DropdownItem,
  SelectedPort,
  RemoveButton,
  NoResultsMessage,
  LanguageSwitcher,
  SearchInput,
} from "./styledPortFinder";
import { useTranslation } from "react-i18next";
import axios from "axios";

interface Port {
  _id: string;
  name: string;
}

const PortFilter: React.FC = () => {
  const { t, i18n } = useTranslation();
  const [searchTerm, setSearchTerm] = useState("");
  const [ports, setPorts] = useState<Port[]>([]);
  const [selectedPorts, setSelectedPorts] = useState<Port[]>([]);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  // Fetch ports from the backend
  useEffect(() => {
    const fetchPorts = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get("http://localhost:5000/ports"); // Replace with your backend URL
        setPorts(response.data); // Expecting response.data to match the received array
      } catch (err) {
        console.error("Error fetching ports:", err);
        setError(t("error.networkFailure"));
      } finally {
        setLoading(false);
      }
    };

    fetchPorts();
  }, [t]);

  // Close dropdown when clicking outside or pressing Escape
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    };

    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscapeKey);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscapeKey);
    };
  }, []);

  const filteredPorts = ports.filter((port) =>
    port.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSelect = (port: Port) => {
    // Add or remove the port from the selectedPorts array
    const isSelected = selectedPorts.find((selected) => selected._id === port._id);

    if (isSelected) {
      // If already selected, remove it
      setSelectedPorts(selectedPorts.filter((p) => p._id !== port._id));
    } else {
      // If not selected, add it
      setSelectedPorts([...selectedPorts, port]);
    }
  };

  const handleRemove = (portId: string) => {
    setSelectedPorts(selectedPorts.filter((port) => port._id !== portId));
  };

  const handleLanguageChange = (language: string) => {
    i18n.changeLanguage(language);
  };

  return (
    <Container>
      <Header>{t("title")}</Header>

      <LanguageSwitcher
        onChange={(e) => handleLanguageChange(e.target.value)}
        defaultValue={i18n.language}
      >
        <option value="en">English</option>
        <option value="de">Deutsch</option>
      </LanguageSwitcher>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <DropdownContainer ref={dropdownRef}>
        <DropdownButton onClick={() => setDropdownOpen(!dropdownOpen)}>
          Ports
          <span>{dropdownOpen ? "▲" : "▼"}</span>
        </DropdownButton>

        {dropdownOpen && (
          <DropdownList>
            {loading ? (
              <p>{t("loading")}</p>
            ) : (
              <>
                <SearchInput
                  type="text"
                  placeholder={t("placeholder.search")}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                {filteredPorts.length > 0 ? (
                  filteredPorts.map((port) => (
                    <DropdownItem key={port._id}>
                      <label>
                        <input
                          type="checkbox"
                          checked={!!selectedPorts.find(
                            (selected) => selected._id === port._id
                          )}
                          onChange={() => handleSelect(port)} // Individual checkbox state handler
                        />
                        {port.name}
                      </label>
                    </DropdownItem>
                  ))
                ) : (
                  <NoResultsMessage>{t("message.noResults")}</NoResultsMessage>
                )}
              </>
            )}
          </DropdownList>
        )}
      </DropdownContainer>

      <div>
        <Header>{t("header.selectedPorts")}</Header>
        {selectedPorts.map((port) => (
          <SelectedPort key={port._id}>
            <span>{port.name}</span>
            <RemoveButton onClick={() => handleRemove(port._id)}>
              {t("button.remove")}
            </RemoveButton>
          </SelectedPort>
        ))}
      </div>
    </Container>
  );
};

export default PortFilter;
