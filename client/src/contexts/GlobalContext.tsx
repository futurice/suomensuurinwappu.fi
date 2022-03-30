import { createContext, FC, useContext } from 'react';

import { Global } from 'interfaces';
import { useGlobalQuery } from 'hooks/useGlobalQuery';

interface GlobalContextValue
  extends Pick<ReturnType<typeof useGlobalQuery>, 'error' | 'loading'> {
  translation: Partial<Global> | undefined;
}

const initialContext: GlobalContextValue = {
  translation: {},
  loading: true,
};

const GlobalContext = createContext(initialContext);

export const useGlobalContext = () => useContext(GlobalContext);

export const GlobalContextProvider: FC = (props) => {
  const { data, ...rest } = useGlobalQuery();

  return (
    <GlobalContext.Provider
      value={{ translation: data[0]?.content, ...rest }}
      {...props}
    />
  );
};
