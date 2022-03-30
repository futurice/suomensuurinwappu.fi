import { ComponentProps, VFC } from 'react';

import { cn } from 'utils';

interface ImageProps extends Omit<ComponentProps<'img'>, 'alt' | 'src'> {
  src?: string | null;
  alt?: string | null;
}

export const Image: VFC<ImageProps> = ({ alt, src, className, ...props }) => (
  <div
    className={cn(
      "relative flex-none overflow-hidden from-pink-500 to-yellow-300 before:absolute before:inset-0 before:bg-gradient-to-b before:opacity-40 before:mix-blend-screen before:content-['']",
      className
    )}
  >
    <img
      className="h-full w-full object-cover"
      alt={alt || ''}
      {...(src && { src })}
      {...props}
    />
  </div>
);
