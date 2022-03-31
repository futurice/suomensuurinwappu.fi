import { QueryResponseItem } from './QueryResponse';

export interface Ad {
  title: string;
  image: {
    filename: string;
    alt?: string | null;
  };
}

export type AdItem = QueryResponseItem<Ad>;