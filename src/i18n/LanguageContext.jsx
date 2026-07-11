import React, { createContext, useContext, useState, useEffect } from 'react';
import hi from './hi.json';
import en from './en.json';

const LanguageContext = createContext();

const translations = {
  'हिंदी': hi,
  'English': en
};

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(() => {
    return localStorage.getItem('selectedLanguage') || 'हिंदी';
  });

  const changeLanguage = (lang) => {
    if (translations[lang]) {
      setLanguage(lang);
      localStorage.setItem('selectedLanguage', lang);
    }
  };

  const t = (key) => {
    const keys = key.split('.');
    let current = translations[language] || translations['हिंदी'];
    
    for (const k of keys) {
      if (current && current[k] !== undefined) {
        current = current[k];
      } else {
        // Fallback to Hindi
        let fallback = translations['हिंदी'];
        for (const fk of keys) {
          if (fallback && fallback[fk] !== undefined) {
            fallback = fallback[fk];
          } else {
            fallback = key;
            break;
          }
        }
        return fallback;
      }
    }
    return current;
  };

  return (
    <LanguageContext.Provider value={{ t, language, changeLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useTranslation = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useTranslation must be used within a LanguageProvider');
  }
  return {
    t: context.t,
    i18n: {
      changeLanguage: context.changeLanguage,
      language: context.language
    }
  };
};
