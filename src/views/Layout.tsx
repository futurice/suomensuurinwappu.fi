import { Outlet } from 'react-router-dom';

import { useLanguageContext } from 'contexts';
import { Helmet } from 'react-helmet';

export const Layout = () => {
  const { lang, switchLang } = useLanguageContext();

  return (
    <div className="p-4">
      <Helmet>
        <html className="min-h-full" />
        <body className="bg-gradient-page bg-cover bg-fixed" />
      </Helmet>
      <h1 className="text-lg font-bold">Wappukalenteri 2022</h1>
      <button onClick={switchLang}>{lang}</button>
      <Outlet />
    </div>
  );
};
