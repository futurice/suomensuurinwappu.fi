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
          hervanta
          center
          elsewhere
          registration
          music
          inside
          outside
          remote

          backToCalendar: back_to_calendar

          searchPlaceholder: search_placeholder

          social
          instagramLabel: instagram_label
          instagram {
            url
          }
          facebookLabel: facebook_label
          facebook {
            url
          }
          telegramLabel: telegram_label
          telegram {
            url
          }
          wappuradioLabel: wappuradio_label
          wappuradio {
            url
          }
        }
      }
    }
  }
`;

export const useGlobalQuery = () =>
  useStoryblokQuery<Global>('GlobalItems', globalQuery);
