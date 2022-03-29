import { VFC } from 'react';
import { Helmet } from 'react-helmet';
import { Outlet } from 'react-router-dom';

import { LanguageSwitcher } from 'components';

export const Layout: VFC = () => {
  return (
    <>
      <Helmet>
        <title>Wappukalenteri 2022</title>
        <meta
          name="description"
          content="Suomen Suurin Wappu: Wappukalenteri"
        />
        <html className="font-body text-dark min-h-full" />
        <body className="bg-gradient-page bg-cover bg-fixed" />
      </Helmet>

      <div className="bg-white p-4 drop-shadow">
        <div className="flex max-w-7xl justify-between py-1 px-2">
          <h1 className="style-heading text-lg text-cyan-700">
            Wappukalenteri 2022
          </h1>
          <LanguageSwitcher />
        </div>
      </div>

      <div className="p-4">
        <Outlet />
      </div>
    </>
  );
};
