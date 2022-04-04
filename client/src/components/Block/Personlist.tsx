import { VFC } from 'react';
import { Crown, TelegramFill } from 'akar-icons';

import { IconItem, Image } from 'components';
import { PersonlistBlock } from 'interfaces';

export const Personlist: VFC<PersonlistBlock> = ({ items }) => (
  <ul className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
    {items.map((item) => (
      <li key={item._uid} className="flex items-center gap-4">
        <Image
          className="h-16 w-16 rounded-full sm:h-24 sm:w-24"
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
              className="text-pink-700 underline hover:no-underline"
            >
              @{item.telegram}
            </a>
          </IconItem>
        </div>
      </li>
    ))}
  </ul>
);
