import { ComponentProps, VFC } from 'react';

import { Image as ImageInterface } from 'interfaces';
import { cn, isNotEmpty } from 'utils';

interface ImageProps extends Omit<ComponentProps<'img'>, 'alt' | 'src'> {
  crop: string;
  img?: ImageInterface;
}

export const Image: VFC<ImageProps> = ({ crop, img, className, ...props }) => (
  <div
    className={cn(
      "relative flex-none overflow-hidden from-pink-500 to-yellow-300 before:absolute before:inset-0 before:bg-gradient-to-b before:opacity-40 before:mix-blend-screen before:content-['']",
      className
    )}
  >
    {isNotEmpty(img?.filename) && (
      <img
        className="h-full w-full object-cover"
        alt={img?.alt || ''}
        src={`${img?.filename}/m/${crop}/smart`}
        {...props}
      />
    )}
  </div>
);
