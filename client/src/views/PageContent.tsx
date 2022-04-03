import { useMemo, VFC } from 'react';
import { Navigate, useParams } from 'react-router-dom';

import { Image } from 'components';
import { useGlobalContext } from 'contexts';

export const PageContent: VFC = () => {
  const { slug } = useParams<'slug'>();
  const { loading, pages } = useGlobalContext();

  const page = useMemo(() => pages.find((p) => p.slug === slug), [pages, slug]);

  if (!loading && !page) {
    return <Navigate to="/events" />;
  }

  return (
    <div>
      <Image
        className="h-64 w-full rounded-t-lg object-cover"
        src={page?.content.image.filename}
        alt={page?.content.image.alt}
      />

      <h2>{page?.content.title}</h2>
    </div>
  );
};
