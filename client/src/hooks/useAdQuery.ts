import { gql } from '@apollo/client';
import { Ad } from 'interfaces';
import { useStoryblokQuery } from './useStoryblokQuery';

const adQuery = gql`
  query AdQuery($langParam: String!) {
    AdvertorialItems(starts_with: $langParam) {
      items {
        slug
        content {
          companyName
          logo {
            filename
            alt
          }
        }
      }
    }
  }
`;

export const useAdQuery = () =>
  useStoryblokQuery<Ad>('AdvertorialItems', adQuery);
