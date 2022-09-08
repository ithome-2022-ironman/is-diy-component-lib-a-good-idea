import { useState, useEffect } from 'react';

function useDelayUnmount(isMounted: boolean, delayTime: number): boolean {
  /* States */
  const [mount, setMount] = useState(false);

  /* Hooks */
  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    if (isMounted && !mount) {
      setMount(true);
    }
    if (!isMounted && mount) {
      timeoutId = setTimeout(() => setMount(false), delayTime);
    }
    return () => clearTimeout(timeoutId);
  }, [isMounted, delayTime, mount]);

  /* Main */
  return mount;
}

export default useDelayUnmount;
