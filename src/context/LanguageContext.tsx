import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { translations, Translations } from '@/i18n/translations';

/**
 * Supported languages
 */
export type Language = 'en' | 'es';

/**
 * Context interface for language management
 */
interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: Translations;
}

/**
 * Create the context with default values
 */
const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

/**
 * Props for the LanguageProvider component
 */
interface LanguageProviderProps {
  children: ReactNode;
}

/**
 * Provider component for language management
 */
export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    // Try to get saved language from localStorage
    const saved = localStorage.getItem('language');
    return (saved === 'en' || saved === 'es') ? saved : 'en';
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('language', lang);
  };

  const value: LanguageContextType = {
    language,
    setLanguage,
    t: translations[language],
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

/**
 * Custom hook to use the language context
 */
export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
