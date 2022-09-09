import { useState, useEffect, useCallback } from 'react';
import { debounce } from 'lodash';

export default function useElementScrollPercentage(
  elementRef: React.MutableRefObject<Element | null>,
  delay: number = 100
): number {
  /* States */
  const [percentage, setPercentage] = useState<number>(0);

  /* Functions */
  const calculatePercentage = useCallback((e: Event): void => {
    const target = e.target as Element;
    const { scrollTop, scrollHeight, clientHeight } = target;
    const percent = (scrollTop / (scrollHeight - clientHeight)) * 100;
    setPercentage(Math.round(percent));
  }, []);
  const debouncedCalcPercentage = debounce(calculatePercentage, delay);

  /* Hooks */
  useEffect(() => {
    const element = elementRef.current;
    element?.addEventListener('scroll', debouncedCalcPercentage);
    return () =>
      element?.removeEventListener('scroll', debouncedCalcPercentage);
  }, [elementRef, debouncedCalcPercentage]);

  /* Main */
  return percentage;
}
