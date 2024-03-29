import { useMemo, VFC } from 'react';
import { Navigate, useParams } from 'react-router-dom';

import { Block, Image } from 'components';
import { useGlobalContext } from 'contexts';

export const PageContent: VFC = () => {
  const { slug } = useParams<'slug'>();
  const { loading, pages } = useGlobalContext();

  const page = useMemo(() => pages.find((p) => p.slug === slug), [pages, slug]);

  if (!loading && !page) {
    return <Navigate to="/events" />;
  }

  return (
    <div className="m-auto max-w-7xl rounded-lg bg-white">
      {page?.content.image.filename && (
        <Image
          className="h-64 w-full rounded-t-lg object-cover md:h-96"
          crop="1920x576"
          img={page.content.image}
        />
      )}

      <div className="m-auto max-w-3xl p-4 sm:p-8">
        <h2 className="style-heading text-3xl text-pink-700">
          {page?.content.title}
        </h2>
        {page?.content.body.map((block) => (
          <Block key={block._uid} {...block} />
        ))}
      </div>
    </div>
  );
};
