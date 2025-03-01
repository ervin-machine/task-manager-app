import '@testing-library/jest-dom';
import { mockAnimationsApi } from 'jsdom-testing-mocks';
import { initReactI18next } from 'react-i18next';
import i18n from '../src/config/i18n';

mockAnimationsApi();
i18n.use(initReactI18next).init({
  lng: 'en',
  resources: { en: { translation: {} } }, // Empty translations
  interpolation: { escapeValue: false }
});
