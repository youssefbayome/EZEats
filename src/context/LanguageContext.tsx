import React, { createContext, useState, useEffect } from "react";
import { I18nManager } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Updates from "expo-updates";
import { readFromStorage, writeToStorage } from "../lib/helpers";
import { Locales } from "../lib/locales";

interface LanguageContextProps {
  isRTL: boolean;
  changeLanguage: (lang: "en" | "ar") => void;
  language: "en" | "ar" | null;
}

const LANGUAGE_KEY = "selectedLanguage";

export const LanguageContext = createContext<LanguageContextProps | null>(null);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isRTL, setIsRTL] = useState(I18nManager.isRTL);
  const [language, setLangauge] = useState<"en" | "ar" | null>(null);
  
  useEffect(() => {
    const loadLanguage = async () => {
      const storedLang = await await readFromStorage(LANGUAGE_KEY);
      setLangauge(storedLang);
      Locales.locale = storedLang;
      if (storedLang) {
        I18nManager.forceRTL(storedLang === "ar");
        setIsRTL(storedLang === "ar");
      }
    };
    loadLanguage();
  }, []);

  const changeLanguage = async (lang: "en" | "ar") => {
    await writeToStorage(LANGUAGE_KEY, lang);
    setLangauge(lang);
    Locales.locale = lang;
    I18nManager.forceRTL(lang === "ar");
    setIsRTL(lang === "ar");
    await Updates.reloadAsync();
  };

  return (
    <LanguageContext.Provider value={{ isRTL, changeLanguage, language }}>
      {children}
    </LanguageContext.Provider>
  );
};
