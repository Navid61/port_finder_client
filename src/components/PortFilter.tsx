import React, { useState } from "react";
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



interface Port {
  id: number;
  name: string;
}

// Mock data
const ports: Port[] = [
  { id: 1, name: "Civitavecchia (Rome), Italy" },
  { id: 2, name: "Miami, United States" },
  { id: 3, name: "Barcelona, Spain" },
  { id: 4, name: "Sydney, Australia" },
];

const PortFilter: React.FC = () => {
  const { t, i18n } = useTranslation();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPorts, setSelectedPorts] = useState<Port[]>([]);
  const [error, setError] = useState<string | null>(null);

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

  const simulateError = () => {
    setError(t("error.networkFailure"));
    setTimeout(() => setError(null), 3000); // Auto-clear error after 3 seconds
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

      <button onClick={simulateError}>{t("button.simulateError")}</button>
    </Container>
  );
};

export default PortFilter;
