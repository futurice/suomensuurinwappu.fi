import { DocumentNode, useQuery } from '@apollo/client';

type WithId<T> = T & {
  id: string;
};

interface QueryResponseItems<TItem> {
  items: WithId<{ content: TItem }>[];
}

export type StoryblokItems<TItem> = WithId<TItem>[];

type QueryResponse<TKey extends string, TItem> = Record<
  TKey,
  QueryResponseItems<TItem>
>;

const mapResult = <TKey extends string, TItem>(
  key: TKey,
  data: QueryResponse<TKey, TItem> | undefined
): StoryblokItems<TItem> => {
  if (!data) {
    return [];
  }

  return data[key].items.map(({ id, content }) => ({ id, ...content }));
};

export const useStoryblokQuery = <TItem>(key: string, query: DocumentNode) => {
  const { data, ...rest } = useQuery<QueryResponse<typeof key, TItem>>(query);

  return {
    data: mapResult(key, data),
    ...rest,
  };
};
