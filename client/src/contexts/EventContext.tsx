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
import { useDates, useEventQuery } from 'hooks';
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
  dates: ReturnType<typeof useDates>;
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
    isFree: FilterProps;
    isParty: FilterProps;
    isExercise: FilterProps;
    isAccessible: FilterProps;
    search: SearchProps;
    isFavourite: FilterProps;
    isFamilyFriendly: FilterProps;
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
  dates: {
    initial: [],
    options: [],
    weekdays: [],
  },
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
    isFree: initialFilter,
    isParty: initialFilter,
    isExercise: initialFilter,
    isAccessible: initialFilter,
    search: initialFilter,
    isFavourite: initialFilter,
    isFamilyFriendly: initialFilter,
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

const useDateSelect = (initial: string[]) => {
  const [selected, set] = useState(initial);

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

  useEffect(() => set(initial), [initial]);

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

  const dates = useDates(data);
  const dateSelect = useDateSelect(dates.initial);
  const location = useFilterGroup('location', Location);
  const place = useFilterGroup('place', Place);
  const teemunkierros = useFilter('teemunkierros');
  const needsRegistration = useFilter('registration');
  const hasMusic = useFilter('music');
  const isRemote = useFilter('remote');
  const isFree = useFilter('free');
  const isParty = useFilter('party');
  const isExercise = useFilter('exercise');
  const isAccessible = useFilter('accessible');
  const isFavourite = useFilter('favourite');
  const isFamilyFriendly = useFilter('familyfriendly');
  const search = useSearch();

  const events = useMemo(
    () =>
      data.filter(({ slug, content }) => {
        if (
          (teemunkierros.checked && !content.teemunkierros) ||
          (needsRegistration.checked && !content.needsRegistration) ||
          (hasMusic.checked && !content.hasMusic) ||
          (isRemote.checked && !content.isRemote) ||
          (isFree.checked && !content.isFree) ||
          (isParty.checked && !content.isParty) ||
          (isExercise.checked && !content.isExercise) ||
          (isAccessible.checked && !content.isAccessible) ||
          (isFamilyFriendly.checked && !content.isFamilyFriendly)
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

        if (isFavourite.checked) {
          const favourites = JSON.parse(localStorage.getItem('WAPPU_FAVOURITES') || '[]');
          if (!favourites.includes(slug)) {
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
      isFree.checked,
      isParty.checked,
      isExercise.checked,
      isAccessible.checked,    
      search.value,
      isFavourite.checked,
      isFamilyFriendly.checked
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
        isFree.checked,
        isParty.checked,
        isExercise.checked,
        isAccessible.checked,
        isFamilyFriendly.checked,
        isNotEmpty(search.value),
      ].filter((f) => f).length,
    [
      teemunkierros.checked,
      location.value,
      place.value,
      needsRegistration.checked,
      hasMusic.checked,
      isRemote.checked,
      isFree.checked,
      isParty.checked,
      isExercise.checked,
      isAccessible.checked,
      search.value,
      isFamilyFriendly.checked
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
        isFree.reset,
        isParty.reset,
        isExercise.reset,
        isAccessible.reset,
        search.reset,
        isFamilyFriendly.reset,
      ].forEach((reset) => reset()),
    [
      teemunkierros.reset,
      location.reset,
      place.reset,
      needsRegistration.reset,
      hasMusic.reset,
      isRemote.reset,
      isFree.reset,
      isParty.reset,
      isExercise.reset,
      isAccessible.reset,
      search.reset,
      isFamilyFriendly.reset,
    ]
  );

  return (
    <EventContext.Provider
      value={{
        currentRef,
        data,
        dates,
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
          isFree,
          isParty,
          isExercise,
          isAccessible,
          search,
          isFavourite,
          isFamilyFriendly
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
