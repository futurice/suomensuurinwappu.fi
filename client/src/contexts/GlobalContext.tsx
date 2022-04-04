import { createContext, FC, useContext } from 'react';

import { Global, PageItem } from 'interfaces';
import { useGlobalQuery, usePageQuery } from 'hooks';
import { Loading } from 'components';

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

export const GlobalContextProvider: FC = ({ children }) => {
  const { data: global, loading: globalLoading, ...rest } = useGlobalQuery();
  const { data: pages, loading: pagesLoading } = usePageQuery();

  const loading = globalLoading || pagesLoading;

  return (
    <GlobalContext.Provider
      value={{
        loading,
        pages,
        translation: global[0]?.content,
        ...rest,
      }}
    >
      <Loading visible={loading} />
      {children}
    </GlobalContext.Provider>
  );
};
