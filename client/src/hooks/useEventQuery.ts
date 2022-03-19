import { gql } from '@apollo/client';
import { Event } from 'interfaces';
import { useStoryblokQuery } from './useStoryblokQuery';

const eventQuery = gql`
  query EventQuery($langParam: String!) {
    EventItems(starts_with: $langParam) {
      items {
        slug
        content {
          title
          dateBegin: date_begin
          dateEnd: date_end
          organizer
          location
          image {
            filename
            alt
          }
          description
          teemunkierros
          teemunkierrosKey: teemunkierros_key
          locationTag: location_tag
        }
      }
    }
  }
`;

export const useEventQuery = () =>
  useStoryblokQuery<Event>('EventItems', eventQuery);
