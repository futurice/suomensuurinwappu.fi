import { VFC } from 'react';

import { BlockProps } from 'interfaces';

import { Personlist } from './Personlist';
import { Text } from './Text';

export const Block: VFC<BlockProps> = (props) => {
  const { component } = props;

  switch (component) {
    case 'text':
      return <Text {...props} />;
    case 'personlist':
      return <Personlist {...props} />;
    default:
      return null;
  }
};
