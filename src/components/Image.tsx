import { ComponentProps } from 'react';

interface ImageProps extends Omit<ComponentProps<'img'>, 'alt' | 'src'> {
  src?: string | null;
  alt?: string | null;
}

export const Image = ({ alt, src, ...props }: ImageProps) => (
  <img alt={alt || ''} {...(src && { src })} {...props} />
);
