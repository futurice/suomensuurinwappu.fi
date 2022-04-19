import { useEffect, VFC } from 'react';
import { ApolloProvider } from '@apollo/client';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import ReactGA from 'react-ga';

import { client } from 'api';
import {
  EventContextProvider,
  GlobalContextProvider,
  LanguageContextProvider,
  AdContextProvider,
} from 'contexts';
import { EventModal, Events, Layout, PageContent } from 'views';

import './index.css';

const routes = () => [
  <Route key="*" path="*" element={<Layout />}>
    <Route path="events" element={<Events />}>
      <Route path=":slug" element={<EventModal />} />
    </Route>
    <Route path="pages/:slug" element={<PageContent />} />
    <Route path="*" element={<Navigate to="events" />} />
  </Route>,
];

export const App: VFC = () => {
  const location = useLocation();

  useEffect(() => {
    ReactGA.set({ page: location.pathname });
    ReactGA.pageview(location.pathname);
  }, [location]);

  return (
    <ApolloProvider client={client}>
      <LanguageContextProvider>
        <GlobalContextProvider>
          <EventContextProvider>
            <AdContextProvider>
              <Routes>
                <Route path=":lang">{routes()}</Route>
                {routes()}
              </Routes>
            </AdContextProvider>
          </EventContextProvider>
        </GlobalContextProvider>
      </LanguageContextProvider>
    </ApolloProvider>
  );
};
