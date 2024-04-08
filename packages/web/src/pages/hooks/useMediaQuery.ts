import { useState, useEffect } from 'react';
import throttle from 'lodash/fp/throttle';

export function useMediaQuery(query: string) {
  const initialMatches = window?.matchMedia(query).matches;
  const [matches, setMatches] = useState(initialMatches);

  useEffect(() => {
    const media = window?.matchMedia(query);
    setMatches(media.matches);

    function onResize() {
      setMatches(media.matches);
    }

    const handleResize = throttle(200, onResize);

    window?.addEventListener('resize', handleResize);
    return () => window?.removeEventListener('resize', handleResize);
  }, [setMatches, query]);

  return matches;
}
