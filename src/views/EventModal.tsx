import { useParams } from 'react-router-dom';
import { render } from 'storyblok-rich-text-react-renderer';

import { useEvent } from 'contexts';

export const EventModal = () => {
  const { slug } = useParams<'slug'>();
  const event = useEvent(slug);

  return (
    <div className="bg-white">
      <h1>{event?.content.title}</h1>
      {render(event?.content.description)}
    </div>
  );
};
