import { StoryblokRichtext } from 'storyblok-rich-text-react-renderer';
import { QueryResponseItem } from './QueryResponse';

export interface Event {
  title: string;
  dateBegin: string;
  dateEnd: string;
  location: string;
  locationTag: string;
  organizer: string;
  image: {
    filename: string;
    alt?: string | null;
  };
  description: StoryblokRichtext;
  teemunkierros: boolean;
  teemunkierrosKey: string;
  needsRegistration: boolean;
  isOutside: boolean;
  hasMusic: boolean;
  isRemote: boolean;
  isFree: boolean;
}

export type EventItem = QueryResponseItem<Event>;
