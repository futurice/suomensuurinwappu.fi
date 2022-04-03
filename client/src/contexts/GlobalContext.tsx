import { createContext, FC, useContext } from 'react';

import { Global, PageItem } from 'interfaces';
import { useGlobalQuery, usePageQuery } from 'hooks';

interface GlobalContextValue
  extends Pick<ReturnType<typeof useGlobalQuery>, 'error' | 'loading'> {
  pages: PageItem[];
  translation: Partial<Global> | undefined;
}

const initialContext: GlobalContextValue = {
  loading: true,
  pages: [],
  translation: {},
};

const GlobalContext = createContext(initialContext);

export const useGlobalContext = () => useContext(GlobalContext);

export const GlobalContextProvider: FC = (props) => {
  const { data: global, loading: globalLoading, ...rest } = useGlobalQuery();
  const { data: pages, loading: pagesLoading } = usePageQuery();

  return (
    <GlobalContext.Provider
      value={{
        loading: globalLoading || pagesLoading,
        pages,
        translation: global[0]?.content,
        ...rest,
      }}
      {...props}
    />
  );
};
