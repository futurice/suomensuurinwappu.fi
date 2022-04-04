import { createContext, FC, useContext, useMemo } from 'react';
import { Link, LinkProps, useLocation } from 'react-router-dom';

export enum Language {
  FI = 'FI',
  EN = 'EN',
}

interface LanguageContextValue {
  lang: Language;
  path: {
    [Language.FI]: string;
    [Language.EN]: string;
  };
}

const initialContext: LanguageContextValue = {
  lang: Language.FI,
  path: {
    [Language.FI]: '',
    [Language.EN]: 'en',
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
      [Language.FI]: basePath,
      [Language.EN]: `/en${basePath}`,
    }),
    [basePath]
  );

  return <LanguageContext.Provider value={{ lang, path }} {...props} />;
};

export const LocalizedLink: FC<LinkProps> = ({ to, ...props }) => {
  const { lang } = useLanguageContext();

  return <Link to={lang === Language.EN ? `/en${to}` : to} {...props} />;
};
