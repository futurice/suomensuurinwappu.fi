import { VFC } from 'react';
import { Helmet } from 'react-helmet';
import { Outlet } from 'react-router-dom';

import { useLanguageContext } from 'contexts';

export const Layout: VFC = () => {
  const { lang, switchLang } = useLanguageContext();

  return (
    <div className="p-4">
      <Helmet>
        <title>Wappukalenteri 2022</title>
        <meta
          name="description"
          content="Suomen Suurin Wappu: Wappukalenteri"
        />
        <html className="font-body min-h-full text-dark" />
        <body className="bg-gradient-page bg-cover bg-fixed" />
      </Helmet>

      <h1 className="style-heading text-lg">Wappukalenteri 2022</h1>
      <button onClick={switchLang}>{lang}</button>

      <Outlet />
    </div>
  );
};
