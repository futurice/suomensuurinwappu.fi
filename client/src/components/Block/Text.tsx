import { VFC } from 'react';

import { RichText } from 'components';
import { TextBlock } from 'interfaces';

export const Text: VFC<TextBlock> = ({ content }) => (
  <RichText>{content}</RichText>
);
