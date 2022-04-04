import { ComponentProps, FC, VFC } from 'react';
import { Envelope, Icon, LinkChain, LinkOut } from 'akar-icons';

import { Link, LinkListBlock, LinkType } from 'interfaces';
import { isNotEmpty } from 'utils';
import { Link as RouterLink } from 'react-router-dom';

enum TargetType {
  Blank,
  Route,
  Self,
}

interface LinkWrapperProps extends Pick<ComponentProps<'a'>, 'className'> {
  href: string;
  target: TargetType;
}

interface LinkItemProps {
  label?: string;
  link: Link;
}

const getLabel = (label: string | undefined, fallback: string) =>
  isNotEmpty(label) ? label : fallback;

const getLinkProps = (
  link: Link,
  label?: string
): [Icon, string, string, TargetType] | undefined => {
  switch (link.linktype) {
    case LinkType.Email:
      return isNotEmpty(link.email)
        ? [
            Envelope,
            `mailto:${link.email}`,
            getLabel(label, link.email),
            TargetType.Self,
          ]
        : undefined;
    case LinkType.Story:
      return isNotEmpty(link.cached_url)
        ? [
            LinkChain,
            `/${link.cached_url}`,
            getLabel(label, link.cached_url),
            TargetType.Route,
          ]
        : undefined;
    default:
      return isNotEmpty(link.url)
        ? [LinkOut, link.url, getLabel(label, link.url), TargetType.Blank]
        : undefined;
  }
};

const LinkWrapper: FC<LinkWrapperProps> = ({
  href,
  target,
  children,
  ...props
}) =>
  target === TargetType.Route ? (
    <RouterLink to={href} {...props}>
      {children}
    </RouterLink>
  ) : (
    <a
      href={href}
      {...(target === TargetType.Blank && {
        target: '_blank',
        rel: 'noreferrer',
      })}
      {...props}
    >
      {children}
    </a>
  );

const LinkItem: VFC<LinkItemProps> = ({ link, label }) => {
  const props = getLinkProps(link, label);

  if (!props) {
    return null;
  }

  const [Icon, href, text, target] = props;

  return (
    <li>
      <LinkWrapper
        href={href}
        target={target}
        className="flex items-center text-cyan-700 underline hover:no-underline"
      >
        <Icon size={16} className="mr-2 flex-none text-pink-700" />
        {text}
      </LinkWrapper>
    </li>
  );
};

export const LinkList: VFC<LinkListBlock> = ({ items }) => (
  <ul className="my-4 flex flex-col gap-2">
    {items.map(({ _uid, link, label }) => (
      <LinkItem key={_uid} label={label} link={link} />
    ))}
  </ul>
);
