/* Home.tsx filenpm install */

import React, { useState, useEffect } from "react";
import axios from "axios";
import DropDownMenu from "../../components/DropDownMenu/DropDownMenu";
import {
  Container,
  Header,
  SelectedPort,
  RemoveButton,
  LanguageSwitcher,
} from "../../styles/portFilterStyles";
import { useTranslation } from "react-i18next";

interface Port {
  _id: string;
  name: string;
}

const Home: React.FC = () => {
  const { t, i18n } = useTranslation();
  const [ports, setPorts] = useState<Port[]>([]);
  const [selectedPorts, setSelectedPorts] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPorts = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get("http://localhost:5000/ports");
        setPorts(response.data);
      } catch (err) {
        console.error("Error fetching ports:", err);
        setError(t("error.networkFailure"));
      } finally {
        setLoading(false);
      }
    };

    fetchPorts();
  }, [t]);

  const handleSelect = (id: string) => {
    setSelectedPorts((prev) =>
      prev.includes(id) ? prev.filter((selectedId) => selectedId !== id) : [...prev, id]
    );
  };

  const handleRemove = (id: string) => {
    setSelectedPorts(selectedPorts.filter((portId) => portId !== id));
  };

  const handleLanguageChange = (language: string) => {
    i18n.changeLanguage(language);
  };

  return (
    <Container>
      <Header>{t("title")}</Header>

      {/* Language Switcher */}
      <LanguageSwitcher
        onChange={(e) => handleLanguageChange(e.target.value)}
        defaultValue={i18n.language}
      >
        <option value="en">English</option>
        <option value="de">Deutsch</option>
      </LanguageSwitcher>

      {error && <p style={{ color: "red" }}>{error}</p>}
      {loading ? (
        <p>{t("loading")}</p>
      ) : (
        <DropDownMenu
          items={ports}
          onSelect={handleSelect}
          selectedIds={selectedPorts}
          placeholder={t("placeholder.search")}
        />
      )}

      <div>
        <Header>{t("header.selectedPorts")}</Header>
        {selectedPorts.map((id) => {
          const port = ports.find((p) => p._id === id);
          return (
            port && (
              <SelectedPort key={id}>
                <span>{port.name}</span>
                <RemoveButton onClick={() => handleRemove(id)}>
                  {t("button.remove")}
                </RemoveButton>
              </SelectedPort>
            )
          );
        })}
      </div>
    </Container>
  );
};

export default Home;
