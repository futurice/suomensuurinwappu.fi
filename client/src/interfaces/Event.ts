import { StoryblokRichtext } from 'storyblok-rich-text-react-renderer';

import { QueryResponseItem } from './QueryResponse';
import { Image } from './storyblok';

export interface Event {
  title: string;
  dateBegin: string;
  dateEnd: string;
  location: string;
  locationTag: string;
  organizer: string;
  image: Image;
  description: StoryblokRichtext;
  teemunkierros: boolean;
  teemunkierrosKey: string;
  needsRegistration: boolean;
  isOutside: boolean;
  hasMusic: boolean;
  isRemote: boolean;
  isFree: boolean;
  isParty: boolean;
  isExercise: boolean;
  isAccessible: boolean;
}

export type EventItem = QueryResponseItem<Event>;
