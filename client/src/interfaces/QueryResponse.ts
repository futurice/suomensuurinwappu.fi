export interface QueryResponseItem<TItem> {
  slug: string;
  content: TItem;
}

export type QueryResponse<TKey extends string, TItem> = Record<
  TKey,
  { items: QueryResponseItem<TItem>[] }
>;
