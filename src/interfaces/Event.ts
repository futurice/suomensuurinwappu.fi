import { QueryResponseItem } from './QueryResponse';

export interface Event {
  title: string;
  dateBegin: string;
  dateEnd: string;
  location: string;
  image: {
    filename: string;
    alt?: string | null;
  };

  teemunkierros: boolean;
}

export type EventItem = QueryResponseItem<Event>;
