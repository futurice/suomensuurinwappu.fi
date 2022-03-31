import { createContext, FC, useContext } from "react";
import { AdItem } from 'interfaces';
import { useAdQuery } from "../hooks/useAdQuery";
import { ApolloError } from "@apollo/client";

interface AdContextValue {
  data: AdItem[];
  error?: ApolloError;
  loading: boolean;
}

const initialContext: AdContextValue = {
  data: [],
  loading: false,
};

const AdContext = createContext(initialContext);

export const useAdContext = () => useContext(AdContext);

export const AdContextProvider: FC = (props) => {
  const { data, error, loading } = useAdQuery();

  return (
    <AdContext.Provider
      value={{
        data,
        error,
        loading,
      }}
      {...props}
    />
  );
};