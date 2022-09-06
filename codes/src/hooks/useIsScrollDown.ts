import { useEffect, useState } from 'react';

export default function useIsScrollDown(): boolean {
  /* States */
  const [oldScrollTop, setOldScrollTop] = useState<number>(0);
  const [isDown, setIsDown] = useState<boolean>(false);

  /* Functions */
  // TODO: lodash
  const handleScrollDirection = (oldScrollTop: number) => () => {
    const newScrollTop = window.scrollY || document.documentElement.scrollTop;
    if (newScrollTop > oldScrollTop) {
      setIsDown(true);
    } else {
      setIsDown(false);
    }
    setOldScrollTop(newScrollTop);
  };

  /* Hooks */
  useEffect(() => {
    window.addEventListener('scroll', handleScrollDirection(oldScrollTop));
    return () => {
      window.removeEventListener('scroll', handleScrollDirection(oldScrollTop));
    };
  }, [oldScrollTop]);

  /* Main */
  return isDown;
}
