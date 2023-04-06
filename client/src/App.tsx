import { VFC } from 'react';
import { ApolloProvider } from '@apollo/client';
import { Navigate, Route, Routes } from 'react-router-dom';

import { client } from 'api';
import {
  EventContextProvider,
  GlobalContextProvider,
  LanguageContextProvider,
  FavouriteContextProvider,
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

export const App: VFC = () => (
  <ApolloProvider client={client}>
    <LanguageContextProvider>
      <GlobalContextProvider>
        <EventContextProvider>
          <FavouriteContextProvider>
            <Routes>
              <Route path=":lang">{routes()}</Route>
              {routes()}
            </Routes>
          </FavouriteContextProvider>
        </EventContextProvider>
      </GlobalContextProvider>
    </LanguageContextProvider>
  </ApolloProvider>
);
