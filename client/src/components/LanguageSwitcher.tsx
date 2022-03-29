import { ChangeEventHandler, useMemo, VFC } from 'react';

import { Language, useLanguageContext } from 'contexts';
import { cn } from 'utils';

interface LanguageButtonProps {
  value: Language;
  label: string;
  sr: string;
}

const LanguageButton: VFC<LanguageButtonProps> = ({ value, label, sr }) => {
  const { lang } = useLanguageContext();

  const checked = useMemo(() => lang === value, [lang, value]);

  return (
    <label
      className={cn(
        'flex h-8 w-8 items-center justify-center rounded-full border border-cyan-700 text-sm font-bold ring-cyan-700/50 focus-within:ring',
        checked ? 'bg-cyan-700 text-white' : 'bg-white text-cyan-700'
      )}
    >
      <input
        type="radio"
        name="language-switch"
        value={value}
        checked={checked}
        className="sr-only"
      />
      {label}
      <span className="sr-only"> {sr}</span>
    </label>
  );
};

export const LanguageSwitcher: VFC = () => {
  const { setLang } = useLanguageContext();

  const onChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    setLang(event.target.value as Language);
  };

  return (
    <div
      className="flex gap-4"
      role="radiogroup"
      aria-label="Valitse kieli"
      onChange={onChange}
    >
      <LanguageButton value={Language.FI} label="FI" sr="suomeksi" />
      <LanguageButton value={Language.EN} label="EN" sr="in English" />
    </div>
  );
};
