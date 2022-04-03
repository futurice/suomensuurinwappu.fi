import { createContext, FC, useContext, useMemo } from 'react';
import { useLocation } from 'react-router-dom';

export enum Language {
  FI = 'FI',
  EN = 'EN',
}

interface LanguageContextValue {
  lang: Language;
  path: {
    fi: string;
    en: string;
  };
}

const initialContext: LanguageContextValue = {
  lang: Language.FI,
  path: {
    fi: '',
    en: 'en',
  },
};

const LanguageContext = createContext(initialContext);

export const useLanguageContext = () => useContext(LanguageContext);

export const LanguageContextProvider: FC = (props) => {
  const location = useLocation();

  const [lang, basePath] = useMemo(() => {
    const [, langParam, base] = location.pathname.match(/^(\/en)?(.*)$/) || [];
    return [langParam !== undefined ? Language.EN : Language.FI, base || ''];
  }, [location]);

  const path = useMemo(
    () => ({
      fi: basePath,
      en: `en${basePath}`,
    }),
    [basePath]
  );

  return <LanguageContext.Provider value={{ lang, path }} {...props} />;
};
