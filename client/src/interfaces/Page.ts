import { QueryResponseItem } from './QueryResponse';

export interface Page {
  title: string;
  image: {
    filename: string;
    alt?: string | null;
  };
}

export type PageItem = QueryResponseItem<Page>;
