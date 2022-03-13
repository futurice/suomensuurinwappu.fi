import {
  createContext,
  Dispatch,
  FC,
  useContext,
  useMemo,
  useState,
} from 'react';
import { ApolloError } from '@apollo/client';
import { EventItem } from 'interfaces';
import { useEventQuery } from 'hooks';

interface Filter {
  value: boolean;
  set: Dispatch<React.SetStateAction<boolean>>;
}

interface EventContextValue {
  error?: ApolloError;
  events: EventItem[];
  filter: {
    teemunkierros: Filter;
  };
  loading: boolean;
}

const initialFilter = {
  value: false,
  set: () => undefined,
};

const initialContext: EventContextValue = {
  events: [],
  filter: {
    teemunkierros: initialFilter,
  },
  loading: false,
};

const EventContext = createContext(initialContext);

const useFilter = () => {
  const [value, set] = useState<boolean>(false);

  return { value, set };
};

export const useEventContext = () => useContext(EventContext);

export const EventContextProvider: FC = (props) => {
  const { data, error, loading } = useEventQuery();

  const teemunkierros = useFilter();

  const events = useMemo(() => {
    if (teemunkierros.value) {
      return data.filter(({ content: { teemunkierros } }) => teemunkierros);
    }

    return data;
  }, [data, teemunkierros.value]);

  return (
    <EventContext.Provider
      value={{ error, events, filter: { teemunkierros }, loading }}
      {...props}
    />
  );
};
