import { gql } from '@apollo/client';
import { Page } from 'interfaces';
import { useStoryblokQuery } from './useStoryblokQuery';

const pageQuery = gql`
  query PageQuery($langParam: String!) {
    PageItems(starts_with: $langParam) {
      items {
        slug
        content {
          title
          image {
            filename
            alt
          }
        }
      }
    }
  }
`;

export const usePageQuery = () =>
  useStoryblokQuery<Page>('PageItems', pageQuery);
