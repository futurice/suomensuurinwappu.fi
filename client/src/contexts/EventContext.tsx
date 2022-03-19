import {
  ChangeEventHandler,
  createContext,
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

export interface FilterProps {
  value: string;
  checked: boolean;
  onChange: ChangeEventHandler<HTMLInputElement>;
}

interface EventContextValue {
  data: EventItem[];
  error?: ApolloError;
  events: EventItem[];
  filter: {
    teemunkierros: FilterProps;
  };
  loading: boolean;
}

const initialFilter = {
  value: '',
  checked: false,
  onChange: () => undefined,
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

const useFilter = (value: string) => {
  const [checked, set] = useState<boolean>(false);

  const onChange: ChangeEventHandler<HTMLInputElement> = useCallback(
    (e) => set(e.target.checked),
    []
  );

  return { value, checked, onChange };
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

  const teemunkierros = useFilter('teemunkierros');

  const events = useMemo(() => {
    if (teemunkierros.checked) {
      return data.filter(({ content: { teemunkierros } }) => teemunkierros);
    }

    return data;
  }, [data, teemunkierros.checked]);

  return (
    <EventContext.Provider
      value={{ data, error, events, filter: { teemunkierros }, loading }}
      {...props}
    />
  );
};