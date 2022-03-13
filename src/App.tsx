import { ApolloProvider } from '@apollo/client';

import { client } from 'api/client';
import { EventContextProvider } from './contexts';
import { EventList } from 'views';

export const App = () => {
  return (
    <ApolloProvider client={client}>
      <EventContextProvider>
        <EventList />
      </EventContextProvider>
    </ApolloProvider>
  );
};
