import { StoryblokRichtext } from 'storyblok-rich-text-react-renderer';
import { QueryResponseItem } from './QueryResponse';

export interface Event {
  title: string;
  dateBegin: string;
  dateEnd: string;
  location: string;
  organizer: string;
  image: {
    filename: string;
    alt?: string | null;
  };
  description: StoryblokRichtext;

  teemunkierros: boolean;
}

export type EventItem = QueryResponseItem<Event>;
