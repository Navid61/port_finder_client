import '@testing-library/jest-dom'
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Mock translations
i18n.use(initReactI18next).init({
  lng: 'en',
  fallbackLng: 'en',
  resources: {
    en: {
      translation: {
        title: 'Port Filter',
        loading: 'Loading...',
        'header.selectedPorts': 'Selected Ports',
        'error.networkFailure': 'Network Failure',
        'placeholder.search': 'Search ports',
        'button.remove': 'Remove',
      },
    },
  },
});

export default i18n;
