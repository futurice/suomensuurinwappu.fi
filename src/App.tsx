import { ApolloProvider } from '@apollo/client';
import { Navigate, Route, Routes } from 'react-router-dom';

import { client } from 'api';
import { EventContextProvider } from 'contexts';
import { EventModal, Events } from 'views';

import './index.css';
import { Layout } from 'views/Layout';

export const App = () => {
  return (
    <ApolloProvider client={client}>
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
    </ApolloProvider>
  );
};
