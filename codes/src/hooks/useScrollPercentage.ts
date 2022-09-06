import { useState, useEffect } from 'react';

export default function useScrollPercentage(): number {
  /* States */
  const [percentage, setPercentage] = useState<number>(0);

  /* Functions */
  const calculatePercentage = (): void => {
    const scrollTop =
      document.documentElement.scrollTop || document.body.scrollTop;
    const scrollHeight =
      document.documentElement.scrollHeight || document.body.scrollHeight;
    const { clientHeight } = document.documentElement;
    const percent = (scrollTop / (scrollHeight - clientHeight)) * 100;
    setPercentage(Math.round(percent));
  };

  /* Hooks */
  useEffect(() => {
    window.addEventListener('scroll', calculatePercentage);
    return () => window.removeEventListener('scroll', calculatePercentage);
  }, []);

  /* Main */
  return percentage;
}
