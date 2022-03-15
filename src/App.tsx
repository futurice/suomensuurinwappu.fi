import { VFC } from 'react';
import { ApolloProvider } from '@apollo/client';
import { Navigate, Route, Routes } from 'react-router-dom';

import { client } from 'api';
import { EventContextProvider, LanguageContextProvider } from 'contexts';
import { EventModal, Events, Layout } from 'views';

import './index.css';

export const App: VFC = () => {
  return (
    <ApolloProvider client={client}>
      <LanguageContextProvider>
        <EventContextProvider>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route path="events" element={<Events />}>
                <Route path=":slug" element={<EventModal />} />
              </Route>
              <Route path="*" element={<Navigate to="events" />} />
            </Route>
          </Routes>
        </EventContextProvider>
      </LanguageContextProvider>
    </ApolloProvider>
  );
};
