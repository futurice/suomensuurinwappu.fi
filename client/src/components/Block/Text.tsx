import { VFC } from 'react';
import { render } from 'storyblok-rich-text-react-renderer';
import { TextBlock } from 'interfaces';

// TODO: actual different typography level styles
export const Text: VFC<TextBlock> = ({ content }) => <>{render(content)}</>;
