import { useEffect, useState, useCallback } from 'react';
import { debounce } from 'lodash';

export default function useElementIsScrollDown<T extends Element>(
  element: T | null,
  delay: number = 100
): boolean {
  /* States */
  const [oldScrollTop, setOldScrollTop] = useState<number>(0);
  const [isDown, setIsDown] = useState<boolean>(false);

  /* Functions */
  const logScrollTop = useCallback(
    (e: Event): void => {
      const target = e.target as Element;
      const newScrollTop = target.scrollTop;
      if (newScrollTop > oldScrollTop) {
        setIsDown(true);
      } else {
        setIsDown(false);
      }
      setOldScrollTop(newScrollTop);
    },
    [oldScrollTop]
  );
  const debouncedLogScrollTop = debounce(logScrollTop, delay);

  /* Hooks */
  useEffect(() => {
    element?.addEventListener('scroll', debouncedLogScrollTop);
    return () => {
      element?.removeEventListener('scroll', debouncedLogScrollTop);
    };
  }, [element, debouncedLogScrollTop]);

  /* Main */
  return isDown;
}
