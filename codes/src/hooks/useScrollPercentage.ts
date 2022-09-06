import { useState, useEffect, useCallback } from 'react';
import { debounce } from 'lodash';
import type { ScrollArgs } from './generalTypes';

export default function useScrollPercentage(args: ScrollArgs = {}): number {
  /* States */
  const { delay = 100 } = args;
  const [percentage, setPercentage] = useState<number>(0);

  /* Functions */
  const calculatePercentage = useCallback((): void => {
    const scrollTop =
      document.documentElement.scrollTop || document.body.scrollTop;
    const scrollHeight =
      document.documentElement.scrollHeight || document.body.scrollHeight;
    const { clientHeight } = document.documentElement;
    const percent = (scrollTop / (scrollHeight - clientHeight)) * 100;
    setPercentage(Math.round(percent));
  }, []);
  const debouncedCalcPercentage = debounce(calculatePercentage, delay);

  /* Hooks */
  useEffect(() => {
    window.addEventListener('scroll', debouncedCalcPercentage);
    return () => window.removeEventListener('scroll', debouncedCalcPercentage);
  }, [debouncedCalcPercentage]);

  /* Main */
  return percentage;
}
