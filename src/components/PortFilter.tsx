import React, { useState, useEffect } from "react";
import {
  Container,
  Header,
  SearchInput,
  DropdownList,
  DropdownItem,
  SelectedPort,
  RemoveButton,
  NoResultsMessage,
  LanguageSwitcher,
} from "./styledPortFinder";
import { useTranslation } from "react-i18next";
import axios from "axios";

interface Port {
  id: number;
  name: string;
}

const PortFilter: React.FC = () => {
  const { t, i18n } = useTranslation();
  const [searchTerm, setSearchTerm] = useState("");
  const [ports, setPorts] = useState<Port[]>([]);
  const [selectedPorts, setSelectedPorts] = useState<Port[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  // Fetch ports from the backend
  useEffect(() => {
    const fetchPorts = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get("http://localhost:5000/ports"); // Replace with your backend URL
        setPorts(response.data);
      } catch (err) {
        console.error(err);
        setError(t("error.networkFailure"));
      } finally {
        setLoading(false);
      }
    };

    fetchPorts();
  }, [t]);

  const filteredPorts = ports.filter((port) =>
    port.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSelect = (port: Port) => {
    if (!selectedPorts.find((selected) => selected.id === port.id)) {
      setSelectedPorts([...selectedPorts, port]);
    }
  };

  const handleRemove = (portId: number) => {
    setSelectedPorts(selectedPorts.filter((port) => port.id !== portId));
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

      <SearchInput
        type="text"
        placeholder={t("placeholder.search")}
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {loading ? (
        <p>{t("loading")}</p>
      ) : (
        <DropdownList>
          {filteredPorts.length > 0 ? (
            filteredPorts.map((port) => (
              <DropdownItem key={port.id} onClick={() => handleSelect(port)}>
                {port.name}
              </DropdownItem>
            ))
          ) : (
            <NoResultsMessage>{t("message.noResults")}</NoResultsMessage>
          )}
        </DropdownList>
      )}

      <div>
        <Header>{t("header.selectedPorts")}</Header>
        {selectedPorts.map((port) => (
          <SelectedPort key={port.id}>
            <span>{port.name}</span>
            <RemoveButton onClick={() => handleRemove(port.id)}>
              {t("button.remove")}
            </RemoveButton>
          </SelectedPort>
        ))}
      </div>
    </Container>
  );
};

export default PortFilter;
