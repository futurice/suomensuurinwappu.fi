import { VFC } from 'react';
import { ApolloProvider } from '@apollo/client';
import { Navigate, Route, Routes } from 'react-router-dom';

import { client } from 'api';
import {
  EventContextProvider,
  GlobalContextProvider,
  LanguageContextProvider,
  AdContextProvider,
} from 'contexts';
import { EventModal, Events, Layout } from 'views';

import './index.css';

const routes = () => [
  <Route key="*" path="*" element={<Layout />}>
    <Route path="events" element={<Events />}>
      <Route path=":slug" element={<EventModal />} />
    </Route>
    <Route path="*" element={<Navigate to="events" />} />
  </Route>,
];

export const App: VFC = () => (
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
