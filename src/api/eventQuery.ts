import { gql } from '@apollo/client';

import { StoryblokItems, useStoryblokQuery } from './storyblok';

const eventQuery = gql`
  query EventQuery {
    EventItems {
      items {
        id
        content {
          title
          dateBegin: date_begin
          dateEnd: date_end
          location

          teemunkierros
          locationTag: location_tag
        }
      }
    }
  }
`;

interface Event {
  title: string;
  dateBegin: string;
  dateEnd: string;
  location: string;
  teemunkierros: boolean;
}

export type EventItems = StoryblokItems<Event>;

export const useQueryEvents = () =>
  useStoryblokQuery<Event>('EventItems', eventQuery);
