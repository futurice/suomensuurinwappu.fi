import { ComponentProps, VFC } from 'react';
import { Link } from 'react-router-dom';

import { Language, useLanguageContext } from 'contexts';
import { cn } from 'utils';

interface LanguageLinkProps {
  link: Language;
  label: string;
  sr: string;
}

const LanguageLink: VFC<LanguageLinkProps> = ({ link, label, sr }) => {
  const { lang, path } = useLanguageContext();
  const current = lang === link;

  return (
    <Link
      className={cn(
        'style-btn w-8 cursor-pointer border border-cyan-700 outline-none',
        current ? 'bg-cyan-700 text-white' : 'bg-white text-cyan-700'
      )}
      to={path[link]}
      {...(current && { 'aria-current': 'location' })}
    >
      {label}
      <span className="sr-only"> {sr}</span>
    </Link>
  );
};

export const LanguageSwitcher: VFC<
  Pick<ComponentProps<'div'>, 'className'>
> = ({ className }) => {
  return (
    <div className={cn('flex gap-4', className)}>
      <LanguageLink link={Language.FI} label="FI" sr="suomeksi" />
      <LanguageLink link={Language.EN} label="EN" sr="in English" />
    </div>
  );
};
