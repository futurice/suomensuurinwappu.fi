import {
  createContext,
  FC,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react';

interface FavouriteContextValue {
  favourites: string[];
  toggleFavouriteBySlug: (slug: string) => void;
}

const initialContext: FavouriteContextValue = {
  favourites: [],
  toggleFavouriteBySlug: () => undefined,
};

const FavouriteContext = createContext(initialContext);

const getStorage = () =>
  JSON.parse(localStorage.getItem('WAPPU_FAVOURITES') || '[]') as string[];

const setStorage = (value: string[]) =>
  localStorage.setItem('WAPPU_FAVOURITES', JSON.stringify(value));

export const FavouriteContextProvider: FC = (props) => {
  const [favourites, setFavourites] = useState(getStorage());

  const toggleFavouriteBySlug = useCallback(
    (slug: string) =>
      setFavourites((prev) => {
        const next = prev.includes(slug)
          ? prev.filter((item) => item !== slug)
          : [...prev, slug];
        setStorage(next);
        return next;
      }),
    []
  );

  return (
    <FavouriteContext.Provider
      value={{ favourites, toggleFavouriteBySlug }}
      {...props}
    />
  );
};

export const useFavourite = (slug: string) => {
  const { favourites, toggleFavouriteBySlug } = useContext(FavouriteContext);

  const isFavourite = useMemo(
    () => favourites.includes(slug),
    [favourites, slug]
  );
  const toggleFavourite = useCallback(
    () => toggleFavouriteBySlug(slug),
    [slug, toggleFavouriteBySlug]
  );

  return { isFavourite, toggleFavourite };
};
