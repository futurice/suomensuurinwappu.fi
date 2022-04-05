import { VFC } from 'react';

import { useGlobalContext } from 'contexts';
import {
  CircleTriangleRight,
  FacebookFill,
  Icon,
  InstagramFill,
  TelegramFill,
} from 'akar-icons';

interface SocialLinkProps {
  href?: string;
  icon: Icon;
  label?: string;
}

const SocialLink: VFC<SocialLinkProps> = ({ href, icon: Icon, label }) => (
  <a
    href={href}
    target="_blank"
    rel="noreferrer"
    className="style-btn w-8 text-cyan-700 outline-none hover:bg-cyan-500/20"
  >
    <Icon aria-label={label} />
  </a>
);

export const SocialLinks: VFC = () => {
  const { translation } = useGlobalContext();

  return (
    <div className="mt-8 mb-4 text-center">
      <p className="style-heading text-center text-pink-700">
        {translation?.social}
      </p>

      <div className="mt-4 mb-8 flex items-center justify-center gap-8">
        <SocialLink
          href={translation?.instagram?.url}
          icon={InstagramFill}
          label={translation?.instagramLabel}
        />
        <SocialLink
          href={translation?.facebook?.url}
          icon={FacebookFill}
          label={translation?.facebookLabel}
        />
        <SocialLink
          href={translation?.telegram?.url}
          icon={TelegramFill}
          label={translation?.telegramLabel}
        />
      </div>

      <a
        href={translation?.wappuradio?.url}
        target="_blank"
        rel="noreferrer"
        className="style-heading flex justify-center gap-2 text-sm text-cyan-700 hover:underline"
      >
        {translation?.wappuradioLabel}
        <CircleTriangleRight size={20} />
      </a>
    </div>
  );
};
