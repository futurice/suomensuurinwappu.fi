import { StoryblokRichtext } from 'storyblok-rich-text-react-renderer';
import { Image } from './Image';
import { QueryResponseItem } from './QueryResponse';

export interface Event {
  title: string;
  dateBegin: string;
  dateEnd: string;
  location: string;
  organizer: string;
  image: Image;
  description: StoryblokRichtext;
  teemunkierros: boolean;
  teemunkierrosKey: string;
}

export type EventItem = QueryResponseItem<Event>;
