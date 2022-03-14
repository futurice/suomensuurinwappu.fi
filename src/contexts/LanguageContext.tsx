import {
  createContext,
  FC,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react';

const LANGUAGE = 'WAPPU_LANGUAGE';

export enum Language {
  FI = 'FI',
  EN = 'EN',
}

interface LanguageContextValue {
  lang: Language;
  langParam: string;
  switchLang: () => void;
}

const initialContext: LanguageContextValue = {
  lang: Language.FI,
  langParam: '',
  switchLang: () => undefined,
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

  const switchLang = useCallback(
    () => setLang((prev) => (prev === Language.FI ? Language.EN : Language.FI)),
    []
  );

  return (
    <LanguageContext.Provider
      value={{ lang, langParam, switchLang }}
      {...props}
    />
  );
};
