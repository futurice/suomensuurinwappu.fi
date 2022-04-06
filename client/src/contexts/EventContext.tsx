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

import { Language, useLanguageContext } from 'contexts';
import { useEventQuery } from 'hooks';
import { EventItem } from 'interfaces';
import { inStr, isNotEmpty, isOfEnum } from 'utils';

export interface DateSelectProps {
  selected: string[];
  onChange: ChangeEventHandler<HTMLInputElement>;
  reset: () => void;
}

export interface FilterProps {
  value: string;
  checked: boolean;
  onChange: ChangeEventHandler<HTMLInputElement>;
  reset: () => void;
}

export interface FilterGroupProps<TFilter extends string> {
  name: string;
  value?: TFilter;
  onChange: ChangeEventHandler<HTMLInputElement>;
  reset: () => void;
}

export interface SearchProps {
  value: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
  reset: () => void;
}

export enum Location {
  Hervanta = 'hervanta',
  Center = 'center',
  Other = 'other',
}

export enum Place {
  Inside = 'inside',
  Outside = 'outside',
}

interface EventContextValue {
  currentRef?: RefObject<HTMLAnchorElement>;
  data: EventItem[];
  dateSelect: DateSelectProps;
  error?: ApolloError;
  events: EventItem[];
  filter: {
    teemunkierros: FilterProps;
    location: FilterGroupProps<Location>;
    place: FilterGroupProps<Place>;
    needsRegistration: FilterProps;
    hasMusic: FilterProps;
    isRemote: FilterProps;
    search: SearchProps;
  };
  count: {
    date: number;
    filter: number;
  };
  reset: {
    date: () => void;
    filter: () => void;
  };
  loading: boolean;
}

const initialFilter = {
  value: '',
  checked: false,
  onChange: () => undefined,
  reset: () => undefined,
};

const initialFilterGroup = {
  name: '',
  onChange: () => undefined,
  reset: () => undefined,
};

const initialContext: EventContextValue = {
  data: [],
  dateSelect: {
    selected: [],
    onChange: () => undefined,
    reset: () => undefined,
  },
  events: [],
  filter: {
    teemunkierros: initialFilter,
    location: initialFilterGroup,
    place: initialFilterGroup,
    needsRegistration: initialFilter,
    hasMusic: initialFilter,
    isRemote: initialFilter,
    search: initialFilter,
  },
  count: {
    date: 0,
    filter: 0,
  },
  reset: {
    date: () => undefined,
    filter: () => undefined,
  },
  loading: false,
};

const EventContext = createContext(initialContext);

const useDateSelect = () => {
  const [selected, set] = useState<string[]>([]);

  const onChange: ChangeEventHandler<HTMLInputElement> = useCallback(
    (e) =>
      set((prev) =>
        e.target.checked
          ? [...prev, e.target.value]
          : prev.filter((s) => s !== e.target.value)
      ),
    []
  );

  const reset = useCallback(() => set([]), []);

  return { selected, onChange, reset };
};

const useFilter = (value: string) => {
  const [checked, set] = useState(false);

  const onChange: ChangeEventHandler<HTMLInputElement> = useCallback(
    (e) => set(e.target.checked),
    []
  );

  const reset = useCallback(() => set(false), []);

  return { value, checked, onChange, reset };
};

const useFilterGroup = <TFilter extends string>(
  name: string,
  values: Record<string, TFilter>
) => {
  const [value, set] = useState<TFilter>();

  const onChange: ChangeEventHandler<HTMLInputElement> = useCallback(
    (e) =>
      set(
        isNotEmpty(e.target.value) && isOfEnum(e.target.value, values)
          ? e.target.value
          : undefined
      ),
    [values]
  );

  const reset = useCallback(() => set(undefined), []);

  return { name, value, onChange, reset };
};

const useSearch = () => {
  const [value, set] = useState('');

  const onChange: ChangeEventHandler<HTMLInputElement> = useCallback(
    (e) => set(e.target.value || ''),
    []
  );

  const reset = useCallback(() => set(''), []);

  return { value, onChange, reset };
};

export const useEventContext = () => useContext(EventContext);

export const useEvent = (slug?: string) => {
  const { lang } = useLanguageContext();
  const { data, loading } = useEventContext();
  const navigate = useNavigate();

  const event = useMemo(() => {
    if (data.length > 0 && slug) {
      return data.find((e) => e.slug === slug);
    }

    return undefined;
  }, [data, slug]);

  const closeEvent = useCallback(
    () => navigate(lang === Language.EN ? '/en/events' : '/events'),
    [lang, navigate]
  );

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

const useMultipleQuery = () => {
  const { data: data1, error: error1, loading: loading1 } = useEventQuery(1);
  const { data: data2, error: error2, loading: loading2 } = useEventQuery(2);
  return {
    data: data1.concat(data2),
    error: error1 ? error1 : error2 ? error2 : undefined,
    loading: loading1 || loading2 ? true : false,
  };
};

export const EventContextProvider: FC = (props) => {
  const { data, error, loading } = useMultipleQuery();

  const currentRef = useRef<HTMLAnchorElement>(null);

  const dateSelect = useDateSelect();
  const location = useFilterGroup('location', Location);
  const place = useFilterGroup('place', Place);
  const teemunkierros = useFilter('teemunkierros');
  const needsRegistration = useFilter('registration');
  const hasMusic = useFilter('music');
  const isRemote = useFilter('remote');
  const search = useSearch();

  const events = useMemo(
    () =>
      data.filter(({ content }) => {
        if (
          (teemunkierros.checked && !content.teemunkierros) ||
          (needsRegistration.checked && !content.needsRegistration) ||
          (hasMusic.checked && !content.hasMusic) ||
          (isRemote.checked && !content.isRemote)
        ) {
          return false;
        }

        if (isNotEmpty(location.value)) {
          if (location.value !== content.locationTag) {
            return false;
          }
        }

        if (isNotEmpty(place.value)) {
          if (
            (place.value === Place.Inside && content.isOutside) ||
            (place.value === Place.Outside && !content.isOutside)
          ) {
            return false;
          }
        }

        if (dateSelect.selected.length > 0) {
          const date = content.dateBegin.split(' ')[0];

          if (dateSelect.selected.every((d) => d !== date)) {
            return false;
          }
        }

        if (isNotEmpty(search.value)) {
          if (inStr(search.value, content.title)) {
            return true;
          }

          const desc = recursiveContent(content.description.content);

          if (inStr(search.value, desc)) {
            return true;
          }

          if (inStr(search.value, content.organizer)) {
            return true;
          }

          return false;
        }

        return true;
      }),
    [
      data,
      dateSelect.selected,
      teemunkierros.checked,
      location.value,
      place.value,
      needsRegistration.checked,
      hasMusic.checked,
      isRemote.checked,
      search.value,
    ]
  );

  const dateCount = useMemo(
    () => dateSelect.selected.length,
    [dateSelect.selected]
  );

  const filterCount = useMemo(
    () =>
      [
        teemunkierros.checked,
        isNotEmpty(location.value),
        isNotEmpty(place.value),
        needsRegistration.checked,
        hasMusic.checked,
        isRemote.checked,
        isNotEmpty(search.value),
      ].filter((f) => f).length,
    [
      teemunkierros.checked,
      location.value,
      place.value,
      needsRegistration.checked,
      hasMusic.checked,
      isRemote.checked,
      search.value,
    ]
  );

  const filterReset = useCallback(
    () =>
      [
        teemunkierros.reset,
        location.reset,
        place.reset,
        needsRegistration.reset,
        hasMusic.reset,
        isRemote.reset,
        search.reset,
      ].forEach((reset) => reset()),
    [
      teemunkierros.reset,
      location.reset,
      place.reset,
      needsRegistration.reset,
      hasMusic.reset,
      isRemote.reset,
      search.reset,
    ]
  );

  return (
    <EventContext.Provider
      value={{
        currentRef,
        data,
        dateSelect,
        error,
        events,
        filter: {
          teemunkierros,
          location,
          place,
          needsRegistration,
          hasMusic,
          isRemote,
          search,
        },
        count: {
          date: dateCount,
          filter: filterCount,
        },
        reset: {
          date: dateSelect.reset,
          filter: filterReset,
        },
        loading,
      }}
      {...props}
    />
  );
};
