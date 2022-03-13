import {
  createContext,
  Dispatch,
  FC,
  useContext,
  useMemo,
  useState,
} from 'react';
import { ApolloError } from '@apollo/client';
import { EventItems, useQueryEvents } from 'api/eventQuery';

interface Filter {
  value: boolean;
  set: Dispatch<React.SetStateAction<boolean>>;
}

interface EventContext {
  error?: ApolloError;
  events: EventItems;
  filter: {
    teemunkierros: Filter;
  };
  loading: boolean;
}

const initialFilter = {
  value: false,
  set: () => undefined,
};

const initialContext: EventContext = {
  events: [],
  filter: {
    teemunkierros: initialFilter,
  },
  loading: false,
};

const _EventContext = createContext(initialContext);

const useFilter = () => {
  const [value, set] = useState<boolean>(false);

  return { value, set };
};

export const useEventContext = () => useContext(_EventContext);

export const EventContextProvider: FC = (props) => {
  const { data, error, loading } = useQueryEvents();

  const teemunkierros = useFilter();

  const events = useMemo(() => {
    if (teemunkierros.value) {
      return data.filter(({ teemunkierros }) => teemunkierros);
    }

    return data;
  }, [data, teemunkierros.value]);

  return (
    <_EventContext.Provider
      value={{ error, events, filter: { teemunkierros }, loading }}
      {...props}
    />
  );
};
