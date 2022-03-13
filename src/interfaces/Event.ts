import { QueryResponseItem } from './QueryResponse';

export interface Event {
  title: string;
  dateBegin: string;
  dateEnd: string;
  location: string;
  teemunkierros: boolean;
}

export type EventItem = QueryResponseItem<Event>;
