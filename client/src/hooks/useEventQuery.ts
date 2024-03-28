import { gql } from '@apollo/client';
import { Event } from 'interfaces';
import { useStoryblokQuery } from './useStoryblokQuery';

const eventQuery = (page: number) => {
  return gql`
    query EventQuery($langParam: String!) {
      EventItems(
        starts_with: $langParam
        sort_by: "content.date_begin:asc"
        page: ${page}
        per_page: 100
      ) {
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
            isParty: party
            isExercise: exercise,
            isAccessible: accessible,
            isFamilyFriendly: familyfriendly
          }
        }
      }
    }
  `;
};

export const useEventQuery = (page: number) =>
  useStoryblokQuery<Event>('EventItems', eventQuery(page));
