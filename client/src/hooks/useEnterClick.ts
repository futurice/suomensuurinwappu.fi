import { KeyboardEventHandler, useCallback, useRef } from 'react';

export const useEnterClick = <
  TElement extends HTMLElement = HTMLLabelElement
>() => {
  const ref = useRef<TElement>(null);
  const onKeyDown: KeyboardEventHandler<TElement> = useCallback(
    (e) => ref.current && e.key === 'Enter' && ref.current.click(),
    []
  );

  return { ref, onKeyDown };
};
