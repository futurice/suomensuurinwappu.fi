import {
  ChangeEventHandler,
  createContext,
  FC,
  RefObject,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
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
  currentRef?: RefObject<HTMLAnchorElement>;
  data: EventItem[];
  error?: ApolloError;
  events: EventItem[];
  filter: {
    teemunkierros: FilterProps;
    hervanta: FilterProps;
    center: FilterProps;
    elsewhere: FilterProps;
    needsRegistration: FilterProps;
    outside: FilterProps;
    inside: FilterProps;
    isRemote: FilterProps;
    hasMusic: FilterProps;
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
    hervanta: initialFilter,
    center: initialFilter,
    elsewhere: initialFilter,
    needsRegistration: initialFilter,
    outside: initialFilter,
    inside: initialFilter,
    isRemote: initialFilter,
    hasMusic: initialFilter,
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

  const currentRef = useRef<HTMLAnchorElement>(null);

  const teemunkierros = useFilter('teemunkierros');
  const hervanta = useFilter('hervanta');
  const center = useFilter('center');
  const elsewhere = useFilter('elsewhere');
  const needsRegistration = useFilter('registration');
  const outside = useFilter('outside');
  const inside = useFilter('inside');
  const isRemote = useFilter('remote');
  const hasMusic = useFilter('music');

  const events = useMemo(() => {
    if (teemunkierros.checked) {
      return data.filter(({ content: { teemunkierros } }) => teemunkierros);
    }
    if (hervanta.checked) {
      return data.filter(
        ({ content: { locationTag } }) =>
          locationTag.toLowerCase() === 'hervanta'
      );
    }

    if (center.checked) {
      return data.filter(
        ({ content: { locationTag } }) => locationTag.toLowerCase() === 'center'
      );
    }
    if (elsewhere.checked) {
      return data.filter(
        ({ content: { locationTag } }) => locationTag.toLowerCase() === 'muu'
      );
    }
    if (needsRegistration.checked) {
      return data.filter(
        ({ content: { needsRegistration } }) => needsRegistration
      );
    }
    if (hasMusic.checked) {
      return data.filter(({ content: { hasMusic } }) => hasMusic);
    }
    if (inside.checked) {
      return data.filter(({ content: { isOutside } }) => isOutside === false);
    }
    if (outside.checked) {
      return data.filter(({ content: { isOutside } }) => isOutside === true);
    }

    if (isRemote.checked) {
      return data.filter(({ content: { isRemote } }) => isRemote);
    }

    return data;
  }, [
    data,
    teemunkierros.checked,
    hervanta.checked,
    center.checked,
    elsewhere.checked,
    needsRegistration.checked,
    hasMusic.checked,
    inside.checked,
    outside.checked,
    isRemote.checked,
  ]);

  return (
    <EventContext.Provider
      value={{
        currentRef,
        data,
        error,
        events,
        filter: {
          teemunkierros,
          hervanta,
          center,
          elsewhere,
          needsRegistration,
          hasMusic,
          inside,
          outside,
          isRemote,
        },
        loading,
      }}
      {...props}
    />
  );
};
