import {
  createContext,
  FC,
  useCallback,
  useContext,
  useEffect,
  useState,
  VFC,
} from 'react';
import { useLocation } from 'react-router-dom';
import ReactGA from 'react-ga4';

import { Loading, RichText } from 'components';
import { useGlobalQuery, usePageQuery } from 'hooks';
import { Global, PageItem } from 'interfaces';
import { isNotEmpty } from 'utils';

const gaMeasurementId = process.env.REACT_APP_GA_MEASUREMENT_ID as string;
const COOKIE_CONSENT = 'COOKIE_CONSENT';

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

const getCookieConsent = () => {
  if (isNotEmpty(gaMeasurementId)) {
    const value = localStorage.getItem(COOKIE_CONSENT);

    if (isNotEmpty(value)) {
      return value === 'true';
    }

    return undefined;
  }

  return false;
};

const CookieConsentDialog: VFC = () => {
  const { pathname } = useLocation();
  const { translation } = useGlobalContext();

  const [consent, set] = useState(getCookieConsent());

  const onAccept = useCallback(() => {
    localStorage.setItem(COOKIE_CONSENT, 'true');
    set(true);
  }, []);

  const onDecline = useCallback(() => {
    localStorage.setItem(COOKIE_CONSENT, 'false');
    set(false);
  }, []);

  useEffect(() => {
    if (consent) {
      ReactGA.initialize(gaMeasurementId);
    }
  }, [consent]);

  useEffect(() => {
    if (consent) {
      ReactGA.set({ page: pathname });
      ReactGA.send({ hitType: 'pageview', page: pathname });
    }
  }, [consent, pathname]);

  return consent === undefined ? (
    <div className="sticky top-0 z-40 bg-cyan-700 px-4 pb-4 text-sm text-white">
      <div className="m-auto flex max-w-7xl flex-col text-sm text-white">
        {translation?.consentInfo && (
          <RichText inverted={true}>{translation.consentInfo}</RichText>
        )}
        <div className="flex flex-wrap justify-end gap-4">
          <button
            onClick={onDecline}
            className="style-btn flex-none bg-cyan-700 px-3 text-white transition-colors hover:bg-cyan-500"
          >
            {translation?.consentDecline}
          </button>
          <button
            onClick={onAccept}
            className="style-btn flex-none bg-white px-3 text-cyan-700 transition-colors hover:bg-cyan-300"
          >
            {translation?.consentAccept}
          </button>
        </div>
      </div>
    </div>
  ) : null;
};

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
      <CookieConsentDialog />
      {children}
    </GlobalContext.Provider>
  );
};
