import { VFC } from 'react';

import { BlockComponent, BlockProps } from 'interfaces';

import { LinkList } from './LinkList';
import { PersonList } from './PersonList';
import { Text } from './Text';

export const Block: VFC<BlockProps> = (props) => {
  const { component } = props;

  switch (component) {
    case BlockComponent.LinkList:
      return <LinkList {...props} />;
    case BlockComponent.PersonList:
      return <PersonList {...props} />;
    case BlockComponent.Text:
      return <Text {...props} />;
    default:
      return null;
  }
};
