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
import { StoryblokRichtextContent } from 'storyblok-rich-text-react-renderer';

import { useEventQuery } from 'hooks';
import { EventItem } from 'interfaces';
import { inStr, isNotEmpty } from 'utils';

export interface FilterProps {
  value: string;
  checked: boolean;
  onChange: ChangeEventHandler<HTMLInputElement>;
}

export interface SearchProps {
  value: string;
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
    search: SearchProps;
  };
  filterCount: number;
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
    search: initialFilter,
  },
  filterCount: 0,
  loading: false,
};

const EventContext = createContext(initialContext);

const useFilter = (value: string) => {
  const [checked, set] = useState(false);

  const onChange: ChangeEventHandler<HTMLInputElement> = useCallback(
    (e) => set(e.target.checked),
    []
  );

  return { value, checked, onChange };
};

const useSearch = () => {
  const [value, setValue] = useState('');

  const onChange: ChangeEventHandler<HTMLInputElement> = useCallback(
    (e) => setValue(e.target.value || ''),
    []
  );

  return { value, onChange };
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

const recursiveContent = (
  arr: StoryblokRichtextContent[] | undefined
): string =>
  arr
    ?.flatMap((item) => {
      if ('text' in item) {
        return item.text;
      }

      if ('content' in item) {
        return recursiveContent(item.content);
      }

      return '';
    })
    .join(' ') || '';

enum Location {
  Hervanta = 'hervanta',
  Center = 'center',
  Other = 'other',
}

export const EventContextProvider: FC = (props) => {
  const { data, error, loading } = useEventQuery();

  const currentRef = useRef<HTMLAnchorElement>(null);

  const filter = {
    teemunkierros: useFilter('teemunkierros'),
    hervanta: useFilter('hervanta'),
    center: useFilter('center'),
    elsewhere: useFilter('elsewhere'),
    needsRegistration: useFilter('registration'),
    outside: useFilter('outside'),
    inside: useFilter('inside'),
    isRemote: useFilter('remote'),
    hasMusic: useFilter('music'),
    search: useSearch(),
  };

  const filterCount = useMemo(() => {
    return Object.values(filter)
      .map((f) => {
        if ('checked' in f) {
          return f.checked;
        }

        return isNotEmpty(f.value);
      })
      .filter((f) => f).length;
  }, [filter]);

  const events = useMemo(
    () =>
      data.filter(({ content }) => {
        if (
          (filter.teemunkierros.checked && !content.teemunkierros) ||
          (filter.hervanta.checked &&
            content.locationTag !== Location.Hervanta) ||
          (filter.center.checked && content.locationTag !== Location.Center) ||
          (filter.elsewhere.checked &&
            content.locationTag !== Location.Other) ||
          (filter.needsRegistration.checked && !content.needsRegistration) ||
          (filter.hasMusic.checked && !content.hasMusic) ||
          (filter.inside.checked && content.isOutside) ||
          (filter.outside.checked && !content.isOutside) ||
          (filter.isRemote.checked && !content.isRemote)
        ) {
          return false;
        }

        if (isNotEmpty(filter.search.value)) {
          if (inStr(filter.search.value, content.title)) {
            return true;
          }

          const desc = recursiveContent(content.description.content);

          if (inStr(filter.search.value, desc)) {
            return true;
          }

          return false;
        }

        return true;
      }),
    [data, filter]
  );

  return (
    <EventContext.Provider
      value={{
        currentRef,
        data,
        error,
        events,
        filter,
        filterCount,
        loading,
      }}
      {...props}
    />
  );
};
