import { useGlobalContext, useFavourite } from 'contexts';
import { Event } from 'interfaces';
import { FC, useMemo } from 'react';

export const Favourite: FC<{ slug: string; event: Event; size?: string }> = ({
  slug,
  event,
  size,
}) => {
  const { isFavourite, toggleFavourite } = useFavourite(slug);
  const { translation } = useGlobalContext();

  const label = useMemo(() => {
    const str = isFavourite
      ? translation?.removeFromFavourites
      : translation?.addToFavourites;

    return str?.replace('{{EVENT}}', event.title);
  }, [event, isFavourite, translation]);

  return (
    <div className="relative z-50 h-3.5 pt-1 pl-2">
      <button
        onClick={toggleFavourite}
        className="absolute right-0 bottom-0 p-10"
        aria-label={label}
      >
        <svg
          fill={isFavourite ? '#6D465B' : 'none'}
          className="absolute bottom-0 right-0 stroke-cyan-700 stroke-2 hover:fill-cyan-700"
          width={size ?? '20px'}
          height={size ?? '20px'}
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M14 20.408c-.492.308-.903.546-1.192.709-.153.086-.308.17-.463.252h-.002a.75.75 0 01-.686 0 16.709 16.709 0 01-.465-.252 31.147 31.147 0 01-4.803-3.34C3.8 15.572 1 12.331 1 8.513 1 5.052 3.829 2.5 6.736 2.5 9.03 2.5 10.881 3.726 12 5.605 13.12 3.726 14.97 2.5 17.264 2.5 20.17 2.5 23 5.052 23 8.514c0 3.818-2.801 7.06-5.389 9.262A31.146 31.146 0 0114 20.408z" />
        </svg>
      </button>
    </div>
  );
};
