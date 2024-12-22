// src/i18nForTests.ts
import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// Test-specific resources for translations
const testResources = {
  en: {
    translation: {
    
      title: "Search and Select Ports",
      placeholder: {
        search: "Type to search ports...",
      },
      message: {
        noResults: "No ports found.",
      },
      header: {
        selectedPorts: "Selected Ports:",
      },
      button: {
        remove: "Remove",
        simulateError: "Simulate Network Error",
      },
      error: {
        networkFailure: "Network failure! Please try again.",
      },
    },
  },
  de: {
    translation: {

      title: "Häfen suchen und auswählen",
      placeholder: {
        search: "Geben Sie ein, um Häfen zu suchen...",
      },
      message: {
        noResults: "Keine Häfen gefunden.",
      },
      header: {
        selectedPorts: "Ausgewählte Häfen:",
      },
      button: {
        remove: "Entfernen",
        simulateError: "Netzwerkfehler simulieren",
      },
      error: {
        networkFailure: "Netzwerkfehler! Bitte versuchen Sie es erneut.",
      },
    },
  },
};

// Initialize i18n for testing
i18n.use(initReactI18next).init({
    resources: testResources,
    lng: "en",
    fallbackLng: "en",
    debug: false,
    interpolation: {
      escapeValue: false,
    },
  });
  

export default i18n;
