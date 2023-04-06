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

          date

          filter
          filterButton: filter_button
          filterReset: filter_reset
          filterAll: filter_all
          teemunkierros
          location
          hervanta
          center
          elsewhere
          place
          inside
          outside
          registration
          music
          remote
          free
          accessible
          party
          exercise
          favourites

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

          consentInfo: consent_info
          consentAccept: consent_accept
          consentDecline: consent_decline

          addToFavourites: add_to_favourites
          removeFromFavourites: remove_from_favourites
        }
      }
    }
  }
`;

export const useGlobalQuery = () =>
  useStoryblokQuery<Global>('GlobalItems', globalQuery);
