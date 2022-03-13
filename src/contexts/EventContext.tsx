import {
  createContext,
  Dispatch,
  FC,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { ApolloError } from '@apollo/client';
import { useNavigate } from 'react-router-dom';

import { EventItem } from 'interfaces';
import { useEventQuery } from 'hooks';

interface Filter {
  value: boolean;
  set: Dispatch<React.SetStateAction<boolean>>;
}

interface EventContextValue {
  data: EventItem[];
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
  data: [],
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

export const useEvent = (slug?: string) => {
  const { data, loading } = useEventContext();
  const navigate = useNavigate();

  const event = useMemo(() => {
    if (data.length > 0 && slug) {
      return data.find((e) => e.slug === slug);
    }

    return undefined;
  }, [data, slug]);

  const closeEvent = useCallback(() => navigate('/events'), [navigate]);

  useEffect(() => {
    if (!loading && !event) {
      closeEvent();
    }
  }, [closeEvent, event, loading]);

  return { event, closeEvent };
};

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
      value={{ data, error, events, filter: { teemunkierros }, loading }}
      {...props}
    />
  );
};
