import { VFC } from 'react';
import { Helmet } from 'react-helmet';
import { Outlet } from 'react-router-dom';
import {
  Dialog,
  DialogBackdrop,
  DialogDisclosure,
  useDialogState,
} from 'reakit/Dialog';
import { ThreeLineHorizontal } from 'akar-icons';

import { LanguageSwitcher } from 'components';
import { useGlobalContext } from 'contexts';

export const Layout: VFC = () => {
  const { translation } = useGlobalContext();
  const dialog = useDialogState();
  const labelId = `${dialog.baseId}-label`;

  return (
    <>
      <Helmet>
        <title>{translation?.title}</title>
        <meta name="description" content={translation?.description} />
        <html className="font-body text-dark min-h-full" />
        <body className="bg-gradient-page bg-cover bg-fixed" />
      </Helmet>

      <div className="bg-white p-4 drop-shadow">
        <div className="flex max-w-7xl justify-between py-1 px-2">
          <h1 className="style-heading text-lg text-cyan-700">
            {translation?.title}
          </h1>
          <DialogDisclosure
            {...dialog}
            className="style-btn-circle text-cyan-700 outline-none hover:bg-cyan-500/20"
          >
            <ThreeLineHorizontal aria-label="Menu" />
          </DialogDisclosure>
          <DialogBackdrop
            className="bg-backdrop absolute inset-0 flex items-start justify-end p-4 pt-24"
            {...dialog}
          >
            <Dialog
              className="flex max-h-full w-full max-w-lg flex-col rounded-md rounded-tl bg-white p-6 drop-shadow-lg"
              aria-labelledby={labelId}
              {...dialog}
            >
              <div className="mb-4 flex items-center border-b border-cyan-900 pb-4">
                <h2
                  id={labelId}
                  className="style-heading flex-1 text-lg text-pink-700"
                >
                  {translation?.menu}
                </h2>
                <LanguageSwitcher className="flex-none" />
              </div>
            </Dialog>
          </DialogBackdrop>
        </div>
      </div>

      <div className="p-4">
        <Outlet />
      </div>
    </>
  );
};
