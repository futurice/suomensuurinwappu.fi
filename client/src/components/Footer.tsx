import { useAdContext } from 'contexts';
import { AdItem } from 'interfaces';
import { VFC } from 'react';
import './Styles.css';

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
    <footer className="footer">
      {adverts.slice(0, 3).map((ad) => (
        <img
          src={ad.content.logo.filename}
          alt={ad.content.logo.alt || `${ad.content.companyName} logo`}
          key={`company-logo-${ad.content.companyName}`}
        />
      ))}
    </footer>
  );
};
