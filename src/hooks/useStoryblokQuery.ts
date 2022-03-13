import { DocumentNode, useQuery } from '@apollo/client';
import { QueryResponse } from 'interfaces';

export const useStoryblokQuery = <TItem>(key: string, query: DocumentNode) => {
  const { data, ...rest } = useQuery<QueryResponse<typeof key, TItem>>(query);

  return {
    data: data ? data[key].items : [],
    ...rest,
  };
};
