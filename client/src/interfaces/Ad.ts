import { QueryResponseItem } from './QueryResponse';

export interface Ad {
  companyName: string;
  logo: {
    filename: string;
    alt?: string | null;
  };
}

export type AdItem = QueryResponseItem<Ad>;