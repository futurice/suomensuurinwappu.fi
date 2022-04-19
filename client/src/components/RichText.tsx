import { VFC } from 'react';
import {
  MARK_BOLD,
  MARK_ITALIC,
  MARK_LINK,
  NODE_HEADING,
  NODE_LI,
  NODE_OL,
  NODE_PARAGRAPH,
  NODE_UL,
  render,
  StoryblokRichtext,
  StoryblokRichtextContent,
} from 'storyblok-rich-text-react-renderer';

import { cn } from 'utils';

interface RichTextProps {
  inverted?: boolean;
  children: StoryblokRichtext | StoryblokRichtextContent[];
}

export const RichText: VFC<RichTextProps> = ({ inverted, children }) => (
  <>
    {render(children, {
      markResolvers: {
        [MARK_BOLD]: (children) => <strong>{children}</strong>,
        [MARK_ITALIC]: (children) => <em>{children}</em>,
        [MARK_LINK]: (children, props) => (
          <a
            className={cn(
              'style-focus -mx-1 rounded-full px-1 underline hover:no-underline',
              inverted ? 'text-cyan-300' : 'text-cyan-700'
            )}
            {...props}
          >
            {children}
          </a>
        ),
      },
      nodeResolvers: {
        [NODE_HEADING]: (children, { level }) => {
          switch (level) {
            case 3:
              return (
                <h3 className="style-heading mt-6 mb-4 text-2xl text-pink-700">
                  {children}
                </h3>
              );
            case 4:
              return (
                <h4 className="style-heading my-4 mt-6 text-xl text-pink-700">
                  {children}
                </h4>
              );
            default:
              return <p className="my-4">{children}</p>;
          }
        },
        [NODE_PARAGRAPH]: (children) => <p className="my-4">{children}</p>,
        [NODE_UL]: (children) => (
          <ul className="my-6 ml-4 list-disc">{children}</ul>
        ),
        [NODE_OL]: (children) => (
          <ul className="my-6 ml-4 list-decimal">{children}</ul>
        ),
        [NODE_LI]: (children) => <li className="-my-2">{children}</li>,
      },
    })}
  </>
);
