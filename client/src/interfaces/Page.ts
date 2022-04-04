import { StoryblokRichtext } from 'storyblok-rich-text-react-renderer';

import { Image, Link } from './storyblok';
import { QueryResponseItem } from './QueryResponse';

export enum BlockComponent {
  LinkList = 'link_list',
  PersonList = 'person_list',
  Text = 'text',
}

enum BlockPartial {
  LinkItem = 'link_item',
  PersonItem = 'person_item',
}

interface BaseBlock<TComponent extends BlockComponent | BlockPartial> {
  component: TComponent;
  _uid: string;
}

export interface LinkListBlock extends BaseBlock<BlockComponent.LinkList> {
  items: ({
    link: Link;
    label?: string;
  } & BaseBlock<BlockPartial.LinkItem>)[];
}

export interface PersonListBlock extends BaseBlock<BlockComponent.PersonList> {
  items: ({
    image: Image;
    name: string;
    title: string;
    telegram: string;
  } & BaseBlock<BlockPartial.PersonItem>)[];
}

export interface TextBlock extends BaseBlock<BlockComponent.Text> {
  content: StoryblokRichtext;
}

export type BlockProps = LinkListBlock | PersonListBlock | TextBlock;
export interface Page {
  title: string;
  image: Image;
  body: BlockProps[];
}

export type PageItem = QueryResponseItem<Page>;
