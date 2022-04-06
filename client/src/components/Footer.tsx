import { useAdContext } from 'contexts';
import { AdItem } from 'interfaces';
import { VFC } from 'react';

function shuffleArray(array: AdItem[]) {
  for (var i = array.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

export const Footer: VFC = () => {
  const { data } = useAdContext();
  let adverts = [...data];
  shuffleArray(adverts);

  return (
    <footer className="bg-circles xs:h-20 fixed bottom-0 left-0 right-0 h-16 bg-[center_top] px-4 pt-4 sm:h-24">
      <div className="xs:py-4 m-auto flex h-full max-w-4xl items-stretch gap-4 py-2 sm:gap-8 md:gap-16">
        {adverts.slice(0, 3).map((ad) => (
          <div
            key={ad.content.companyName}
            className="flex flex-1 items-center justify-center"
          >
            <img
              className="max-h-full max-w-full object-contain object-center"
              src={`${ad.content.logo.filename}/m/352x0/`}
              alt={ad.content.logo.alt || `${ad.content.companyName} logo`}
            />
          </div>
        ))}
      </div>
    </footer>
  );
};
