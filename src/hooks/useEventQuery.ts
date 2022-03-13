import { gql } from '@apollo/client';
import { Event } from 'interfaces';
import { useStoryblokQuery } from './useStoryblokQuery';

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

export const useEventQuery = () =>
  useStoryblokQuery<Event>('EventItems', eventQuery);
