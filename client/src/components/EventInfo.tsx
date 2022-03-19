import { VFC } from 'react';
import { Clock, Crown, Location, PeopleGroup } from 'akar-icons';

import { Event } from 'interfaces';
import { formatTimeRange } from 'utils';

import { IconItem } from './IconItem';

export const EventInfo: VFC<Event> = ({
  dateBegin,
  dateEnd,
  location,
  organizer,
  teemunkierros,
  teemunkierrosKey,
}) => (
  <>
    <IconItem icon={Clock}>{formatTimeRange(dateBegin, dateEnd)}</IconItem>
    <IconItem icon={Location}>{location}</IconItem>
    {teemunkierros && (
      <IconItem icon={Crown}>Teemunkierros {teemunkierrosKey}</IconItem>
    )}
    <IconItem icon={PeopleGroup}>{organizer}</IconItem>
  </>
);