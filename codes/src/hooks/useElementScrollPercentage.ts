import { useState, useEffect, useCallback } from 'react';
import { debounce } from 'lodash';

export default function useElementScrollPercentage<T extends Element>(
  element: T | null,
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
    element?.addEventListener('scroll', debouncedCalcPercentage);
    return () =>
      element?.removeEventListener('scroll', debouncedCalcPercentage);
  }, [element, debouncedCalcPercentage]);

  /* Main */
  return percentage;
}
