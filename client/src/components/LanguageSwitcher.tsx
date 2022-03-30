import { ChangeEventHandler, ComponentProps, useMemo, VFC } from 'react';

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
        'style-btn-circle cursor-pointer border border-cyan-700',
        checked ? 'bg-cyan-700 text-white' : 'bg-white text-cyan-700'
      )}
    >
      <input
        type="radio"
        name="language-switch"
        value={value}
        defaultChecked={checked}
        className="sr-only"
      />
      {label}
      <span className="sr-only"> {sr}</span>
    </label>
  );
};

export const LanguageSwitcher: VFC<
  Pick<ComponentProps<'div'>, 'className'>
> = ({ className }) => {
  const { setLang } = useLanguageContext();

  const onChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    setLang(event.target.value as Language);
  };

  return (
    <div
      className={cn('flex gap-4', className)}
      role="radiogroup"
      aria-label="Valitse kieli"
      onChange={onChange}
    >
      <LanguageButton value={Language.FI} label="FI" sr="suomeksi" />
      <LanguageButton value={Language.EN} label="EN" sr="in English" />
    </div>
  );
};
