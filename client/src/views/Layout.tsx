import { VFC } from 'react';
import { Helmet } from 'react-helmet';
import { Outlet } from 'react-router-dom';
import { DialogDisclosure, useDialogState } from 'reakit/Dialog';
import { ThreeLineHorizontal } from 'akar-icons';

import {
  Footer,
  LanguageSwitcher,
  Modal,
  NavLink,
  SocialLinks,
} from 'components';
import { LocalizedLink, useGlobalContext } from 'contexts';

export const Layout: VFC = () => {
  const { pages, translation } = useGlobalContext();
  const dialog = useDialogState({ animated: true });

  return (
    <>
      <Helmet>
        <title>{translation?.title}</title>
        <meta name="description" content={translation?.description} />
        <html className="font-body text-dark min-h-full" />
        <body className="bg-gradient-page bg-cover bg-fixed" />
      </Helmet>

      <div className="h-16 bg-white p-4 drop-shadow">
        <div className="m-auto flex h-full max-w-7xl items-center justify-between">
          <h1 className="style-heading text-lg text-cyan-700">
            <LocalizedLink
              to="/events"
              className="style-focus -my-1 -mx-2 rounded-full py-1 px-2 hover:underline"
            >
              {translation?.title}
            </LocalizedLink>
          </h1>
          <DialogDisclosure
            {...dialog}
            className="style-btn -mr-2 w-8 text-cyan-700 outline-none hover:bg-cyan-500/20"
          >
            <ThreeLineHorizontal aria-label="Menu" />
          </DialogDisclosure>
          <Modal
            title={translation?.menu}
            titleAddition={<LanguageSwitcher className="flex-none" />}
            {...dialog}
          >
            <nav>
              <NavLink to="/events" onClick={dialog.hide}>
                {translation?.events}
              </NavLink>
              {pages.map(({ slug, content }) => (
                <NavLink key={slug} to={`/pages/${slug}`} onClick={dialog.hide}>
                  {content.title}
                </NavLink>
              ))}
            </nav>
            <SocialLinks />
          </Modal>
        </div>
      </div>

      <div className="p-4 pb-32">
        <Outlet />
      </div>

      <Footer />
    </>
  );
};
