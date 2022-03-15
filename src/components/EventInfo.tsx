import { Clock, Crown, Location, PeopleGroup } from 'akar-icons';

import { Event } from 'interfaces';
import { formatTimeRange } from 'utils';

import { IconItem } from './IconItem';

export const EventInfo = ({
  dateBegin,
  dateEnd,
  location,
  organizer,
  teemunkierros,
  teemunkierrosKey,
}: Event) => (
  <>
    <IconItem icon={Clock}>{formatTimeRange(dateBegin, dateEnd)}</IconItem>
    <IconItem icon={Location}>{location}</IconItem>
    {teemunkierros && (
      <IconItem icon={Crown}>Teemunkierros {teemunkierrosKey}</IconItem>
    )}
    <IconItem icon={PeopleGroup}>{organizer}</IconItem>
  </>
);
