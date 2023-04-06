import { FC, useEffect, useState } from 'react';

export const Favourite: FC<{ slug:string, size?:string }> = ({ slug, size }) => {
  const [ isFavourite, setIsFavourite ] = useState(false);

  useEffect(() => {
    const previousFavourites = JSON.parse(localStorage.getItem('WAPPU_FAVOURITES') || '[]');
    setIsFavourite(previousFavourites.includes(slug));
  }, [setIsFavourite, slug])

  const addToFavourites = (e: any) => {
    const previousFavourites = JSON.parse(localStorage.getItem('WAPPU_FAVOURITES') || '[]');
    let newFavourites = previousFavourites;
    if (isFavourite) {
      newFavourites = newFavourites.filter((item: any) => item !== slug);
    } else {
      newFavourites = [...previousFavourites, slug];
    }
    setIsFavourite(!isFavourite);
    localStorage.setItem('WAPPU_FAVOURITES', JSON.stringify(newFavourites));
  }

  return (
    <div className="relative h-3.5 z-50 pt-1 pl-2">
      <button onClick={addToFavourites} className='p-10 absolute right-0 bottom-0'>
        <svg fill={isFavourite ? "#6D465B" : "none"} className="stroke-cyan-700 stroke-2 hover:fill-cyan-700 absolute bottom-0 right-0" width={size ?? "20px"} height={size ?? "20px"} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M14 20.408c-.492.308-.903.546-1.192.709-.153.086-.308.17-.463.252h-.002a.75.75 0 01-.686 0 16.709 16.709 0 01-.465-.252 31.147 31.147 0 01-4.803-3.34C3.8 15.572 1 12.331 1 8.513 1 5.052 3.829 2.5 6.736 2.5 9.03 2.5 10.881 3.726 12 5.605 13.12 3.726 14.97 2.5 17.264 2.5 20.17 2.5 23 5.052 23 8.514c0 3.818-2.801 7.06-5.389 9.262A31.146 31.146 0 0114 20.408z"/>
        </svg>
      </button>
    </div>
  )
};
