import { useEffect, useState, VFC } from 'react';

import { cn } from 'utils';

interface LoadingProps {
  visible: boolean;
}

export const Loading: VFC<LoadingProps> = ({ visible }) => {
  const [isVisible, setVisible] = useState(visible);
  const [isAnimating, setAnimating] = useState(false);

  useEffect(() => console.log(isAnimating), [isAnimating]);

  useEffect(
    () =>
      setVisible((prev) => {
        if (prev !== visible) {
          setAnimating(true);
        }

        return visible;
      }),
    [visible]
  );

  const shouldRender = isVisible || isAnimating;

  return shouldRender ? (
    <div
      onTransitionEnd={() => setAnimating(false)}
      aria-busy="true"
      className={cn(
        'absolute inset-0 z-50 flex h-screen w-screen items-center justify-center gap-4 bg-white transition-opacity duration-1000',
        visible ? 'opacity-100 duration-200' : 'opacity-0'
      )}
    >
      <div className="h-8 w-8 animate-[loading_1s_ease-in-out_infinite] rounded-full bg-pink-300" />
      <div className="h-8 w-8 animate-[loading_1s_ease-in-out_infinite_0.1s] rounded-full bg-yellow-500" />
      <div className="h-8 w-8 animate-[loading_1s_ease-in-out_infinite_0.2s] rounded-full bg-cyan-500" />
    </div>
  ) : null;
};
