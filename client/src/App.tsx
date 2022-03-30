import { VFC } from 'react';
import { ApolloProvider } from '@apollo/client';
import { Navigate, Route, Routes } from 'react-router-dom';

import { client } from 'api';
import {
  EventContextProvider,
  GlobalContextProvider,
  LanguageContextProvider,
} from 'contexts';
import { EventModal, Events, Layout } from 'views';

import './index.css';

export const App: VFC = () => (
  <ApolloProvider client={client}>
    <LanguageContextProvider>
      <GlobalContextProvider>
        <EventContextProvider>
          <Routes>
            <Route path="*" element={<Layout />}>
              <Route path="events" element={<Events />}>
                <Route path=":slug" element={<EventModal />} />
              </Route>
              <Route path="*" element={<Navigate to="events" />} />
            </Route>
          </Routes>
        </EventContextProvider>
      </GlobalContextProvider>
    </LanguageContextProvider>
  </ApolloProvider>
);
