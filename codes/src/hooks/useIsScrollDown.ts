import { useEffect, useState, useCallback } from 'react';
import { debounce } from 'lodash';
import type { ScrollArgs } from './generalTypes';

export default function useIsScrollDown(args: ScrollArgs = {}): boolean {
  /* States */
  const { delay = 100 } = args;
  const [oldScrollTop, setOldScrollTop] = useState<number>(0);
  const [isDown, setIsDown] = useState<boolean>(false);

  /* Functions */
  const handleScrollDirection = useCallback((): void => {
    const newScrollTop = window.scrollY || document.documentElement.scrollTop;
    if (newScrollTop > oldScrollTop) {
      setIsDown(true);
    } else {
      setIsDown(false);
    }
    setOldScrollTop(newScrollTop);
  }, [oldScrollTop]);
  const debouncedScrollDirection = debounce(handleScrollDirection, delay);

  /* Hooks */
  useEffect(() => {
    window.addEventListener('scroll', debouncedScrollDirection);
    return () => {
      window.removeEventListener('scroll', debouncedScrollDirection);
    };
  }, [debouncedScrollDirection]);

  /* Main */
  return isDown;
}
