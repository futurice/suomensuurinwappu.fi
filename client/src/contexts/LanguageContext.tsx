import { createContext, FC, useContext, useMemo, useState } from 'react';

const LANGUAGE = 'WAPPU_LANGUAGE';

export enum Language {
  FI = 'FI',
  EN = 'EN',
}

interface LanguageContextValue {
  lang: Language;
  langParam: string;
  setLang: (lang: Language) => void;
}

const initialContext: LanguageContextValue = {
  lang: Language.FI,
  langParam: '',
  setLang: () => undefined,
};

const LanguageContext = createContext(initialContext);

export const useLanguageContext = () => useContext(LanguageContext);

export const LanguageContextProvider: FC = (props) => {
  const [lang, setLang] = useState(
    window.localStorage.getItem(LANGUAGE) === Language.EN
      ? Language.EN
      : Language.FI
  );

  const langParam = useMemo(() => {
    window.localStorage.setItem(LANGUAGE, lang);
    return lang === Language.FI ? '' : 'en/*';
  }, [lang]);

  return (
    <LanguageContext.Provider value={{ lang, langParam, setLang }} {...props} />
  );
};
