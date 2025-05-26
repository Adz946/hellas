import { useEffect, useState } from 'react';

export function useThemeLogo() {
  const [logoColor, setLogoColor] = useState(null);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

    const updateLogo = (e) => {
      setLogoColor(e.matches ? 'WHITE' : 'BLACK');
    };

    updateLogo(mediaQuery);
    mediaQuery.addEventListener('change', updateLogo);
    return () => { mediaQuery.removeEventListener('change', updateLogo); };
  }, []);

  return logoColor || "WHITE";
}