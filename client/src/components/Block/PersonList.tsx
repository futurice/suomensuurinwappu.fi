import { VFC } from 'react';
import { Crown, TelegramFill } from 'akar-icons';

import { IconItem, Image } from 'components';
import { PersonListBlock } from 'interfaces';

export const PersonList: VFC<PersonListBlock> = ({ items }) => (
  <ul className="my-4 grid gap-4 sm:grid-cols-2">
    {items.map((item) => (
      <li key={item._uid} className="flex items-center gap-4">
        <Image
          className="h-16 w-16 rounded-full md:h-24 md:w-24"
          src={item.image.filename}
          alt={item.image.alt}
        />
        <div className="flex flex-col gap-1">
          <p className="style-heading text-pink-700">{item.name}</p>
          <IconItem icon={Crown}>{item.title}</IconItem>
          <IconItem icon={TelegramFill}>
            <a
              href={`https://t.me/${item.telegram}`}
              target="_blank"
              className="text-cyan-700 underline hover:no-underline"
            >
              @{item.telegram}
            </a>
          </IconItem>
        </div>
      </li>
    ))}
  </ul>
);
