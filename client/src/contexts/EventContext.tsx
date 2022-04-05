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
import { inStr, isNotEmpty } from 'utils';

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

export interface SearchProps {
  value: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
  reset: () => void;
}

interface EventContextValue {
  currentRef?: RefObject<HTMLAnchorElement>;
  data: EventItem[];
  dateSelect: DateSelectProps;
  error?: ApolloError;
  events: EventItem[];
  filter: {
    teemunkierros: FilterProps;
    hervanta: FilterProps;
    center: FilterProps;
    elsewhere: FilterProps;
    needsRegistration: FilterProps;
    hasMusic: FilterProps;
    inside: FilterProps;
    outside: FilterProps;
    isRemote: FilterProps;
    search: SearchProps;
  };
  filterCount: number;
  filterReset: () => void;
  loading: boolean;
}

const initialFilter = {
  value: '',
  checked: false,
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
    hervanta: initialFilter,
    center: initialFilter,
    elsewhere: initialFilter,
    needsRegistration: initialFilter,
    hasMusic: initialFilter,
    inside: initialFilter,
    outside: initialFilter,
    isRemote: initialFilter,
    search: initialFilter,
  },
  filterCount: 0,
  filterReset: () => undefined,
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

enum Location {
  Hervanta = 'hervanta',
  Center = 'center',
  Other = 'other',
}

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
  const teemunkierros = useFilter('teemunkierros');
  const hervanta = useFilter('hervanta');
  const center = useFilter('center');
  const elsewhere = useFilter('elsewhere');
  const needsRegistration = useFilter('registration');
  const hasMusic = useFilter('music');
  const inside = useFilter('inside');
  const outside = useFilter('outside');
  const isRemote = useFilter('remote');
  const search = useSearch();

  const events = useMemo(
    () =>
      data.filter(({ content }) => {
        if (
          (teemunkierros.checked && !content.teemunkierros) ||
          (hervanta.checked && content.locationTag !== Location.Hervanta) ||
          (center.checked && content.locationTag !== Location.Center) ||
          (elsewhere.checked && content.locationTag !== Location.Other) ||
          (needsRegistration.checked && !content.needsRegistration) ||
          (hasMusic.checked && !content.hasMusic) ||
          (inside.checked && content.isOutside) ||
          (outside.checked && !content.isOutside) ||
          (isRemote.checked && !content.isRemote)
        ) {
          return false;
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
      hervanta.checked,
      center.checked,
      elsewhere.checked,
      needsRegistration.checked,
      hasMusic.checked,
      inside.checked,
      outside.checked,
      isRemote.checked,
      search.value,
    ]
  );

  const filterCount = useMemo(
    () =>
      [
        teemunkierros.checked,
        hervanta.checked,
        center.checked,
        elsewhere.checked,
        needsRegistration.checked,
        hasMusic.checked,
        inside.checked,
        outside.checked,
        isRemote.checked,
        isNotEmpty(search.value),
      ].filter((f) => f).length,
    [
      teemunkierros.checked,
      hervanta.checked,
      center.checked,
      elsewhere.checked,
      needsRegistration.checked,
      hasMusic.checked,
      inside.checked,
      outside.checked,
      isRemote.checked,
      search.value,
    ]
  );

  const filterReset = useCallback(
    () =>
      [
        teemunkierros.reset,
        hervanta.reset,
        center.reset,
        elsewhere.reset,
        needsRegistration.reset,
        hasMusic.reset,
        inside.reset,
        outside.reset,
        isRemote.reset,
        search.reset,
      ].forEach((reset) => reset()),
    [
      teemunkierros.reset,
      hervanta.reset,
      center.reset,
      elsewhere.reset,
      needsRegistration.reset,
      hasMusic.reset,
      inside.reset,
      outside.reset,
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
          hervanta,
          center,
          elsewhere,
          needsRegistration,
          hasMusic,
          inside,
          outside,
          isRemote,
          search,
        },
        filterCount,
        filterReset,
        loading,
      }}
      {...props}
    />
  );
};
