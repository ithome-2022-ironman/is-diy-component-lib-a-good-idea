import { useCallback, useEffect, useState } from 'react';

type Scheme = 'light' | 'dark';

type PrefersColorScheme = `(prefers-color-scheme: ${Scheme})`;

const SCHEME_QUERY: PrefersColorScheme = '(prefers-color-scheme: light)';

export default function useSystemColorScheme(): Scheme {
  /* States */
  const [scheme, setScheme] = useState<Scheme>(
    window.matchMedia(SCHEME_QUERY).matches ? 'light' : 'dark'
  );

  /* Functions */
  const updateScheme = useCallback((e: MediaQueryListEvent): void => {
    if (e.matches) {
      setScheme('light');
    } else {
      setScheme('dark');
    }
  }, []);

  /* Hooks */
  useEffect(() => {
    const matchMedia = window.matchMedia('(prefers-color-scheme: light)');
    matchMedia.addEventListener('change', updateScheme);
    return () => {
      matchMedia.removeEventListener('change', updateScheme);
    };
  }, [updateScheme]);

  /* Main */
  return scheme;
}
