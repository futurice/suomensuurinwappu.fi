import { ComponentProps, VFC } from 'react';

import { Language, useLanguageContext } from 'contexts';
import { cn } from 'utils';
import { Link } from 'react-router-dom';

interface LanguageLinkProps {
  link: Language;
  to: string;
  label: string;
  sr: string;
}

const LanguageLink: VFC<LanguageLinkProps> = ({ link, to, label, sr }) => {
  const { lang } = useLanguageContext();

  return (
    <Link
      className={cn(
        'style-btn-circle cursor-pointer border border-cyan-700',
        lang === link ? 'bg-cyan-700 text-white' : 'bg-white text-cyan-700'
      )}
      to={to}
    >
      {label}
      <span className="sr-only"> {sr}</span>
    </Link>
  );
};

export const LanguageSwitcher: VFC<
  Pick<ComponentProps<'div'>, 'className'>
> = ({ className }) => {
  const { path } = useLanguageContext();

  return (
    <div className={cn('flex gap-4', className)}>
      <LanguageLink link={Language.FI} to={path.fi} label="FI" sr="suomeksi" />
      <LanguageLink
        link={Language.EN}
        to={path.en}
        label="EN"
        sr="in English"
      />
    </div>
  );
};
