import { ApolloProvider } from '@apollo/client';

import { client } from 'api/client';
import { EventContextProvider } from 'contexts';
import { Events } from 'views';

import './index.css';

export const App = () => {
  return (
    <ApolloProvider client={client}>
      <EventContextProvider>
        <Events />
      </EventContextProvider>
    </ApolloProvider>
  );
};
