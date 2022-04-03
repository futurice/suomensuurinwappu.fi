import { DocumentNode, useQuery } from '@apollo/client';

import { Language, useLanguageContext } from 'contexts';
import { QueryResponse } from 'interfaces';

export const useStoryblokQuery = <TItem>(key: string, query: DocumentNode) => {
  const { lang } = useLanguageContext();
  const { data, ...rest } = useQuery<QueryResponse<typeof key, TItem>>(query, {
    variables: { langParam: lang === Language.EN ? 'en/*' : '' },
  });

  return {
    data: data ? data[key].items : [],
    ...rest,
  };
};
