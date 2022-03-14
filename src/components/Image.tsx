import { ComponentProps } from 'react';

interface ImageProps extends Omit<ComponentProps<'img'>, 'alt' | 'src'> {
  src?: string | null;
  alt?: string | null;
}

export const Image = ({ alt, src, className, ...props }: ImageProps) => (
  <div
    className={`relative overflow-hidden from-pink-500 to-yellow-300 before:absolute before:inset-0 before:bg-gradient-to-b before:opacity-40 before:mix-blend-screen before:content-[''] ${
      className ?? ''
    }`}
  >
    <img
      className="h-full w-full object-cover"
      alt={alt || ''}
      {...(src && { src })}
      {...props}
    />
  </div>
);
