import { StoryblokRichtext } from 'storyblok-rich-text-react-renderer';

import { Image } from './Image';
import { QueryResponseItem } from './QueryResponse';

interface BaseBlock {
  _uid: string;
}

export interface TextBlock extends BaseBlock {
  component: 'text';
  content: StoryblokRichtext;
}

export interface PersonlistBlock extends BaseBlock {
  component: 'personlist';
  items: ({
    image: Image;
    name: string;
    title: string;
    telegram: string;
  } & BaseBlock)[];
}

export type BlockProps = TextBlock | PersonlistBlock;
export interface Page {
  title: string;
  image: Image;
  body: BlockProps[];
}

export type PageItem = QueryResponseItem<Page>;
