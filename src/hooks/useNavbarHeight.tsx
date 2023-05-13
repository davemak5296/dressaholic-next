import { useEffect, useState } from "react";

const useNavbarHeight = () => {
  const [scrollH, setScrollH] = useState(0);

  useEffect(() => {
    const handleScroll: EventListener = () => {
      setScrollH(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll, true);
    
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return { scrollH };
}

export default useNavbarHeight;