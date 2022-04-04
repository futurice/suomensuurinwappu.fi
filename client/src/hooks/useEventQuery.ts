import { gql } from '@apollo/client';
import { Event } from 'interfaces';
import { useStoryblokQuery } from './useStoryblokQuery';

const eventQuery = gql`
  query EventQuery($langParam: String!) {
    EventItems(starts_with: $langParam, sort_by: "content.date_begin:asc") {
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
          needsRegistration: registration
          isOutside: outside
          hasMusic: music
          isRemote: remote
          isFree: free
        }
      }
    }
  }
`;

export const useEventQuery = () =>
  useStoryblokQuery<Event>('EventItems', eventQuery);
