import { gql } from '@apollo/client';
import { Global } from 'interfaces';
import { useStoryblokQuery } from './useStoryblokQuery';

const globalQuery = gql`
  query GlobalQuery($langParam: String!) {
    GlobalItems(starts_with: $langParam) {
      items {
        content {
          title
          description
          events

          menu

          teemunkierros

          backToCalendar: back_to_calendar
        }
      }
    }
  }
`;

export const useGlobalQuery = () =>
  useStoryblokQuery<Global>('GlobalItems', globalQuery);
