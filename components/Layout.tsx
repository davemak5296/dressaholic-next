import { useState, useEffect } from "react";
import Meta from "./Meta";
import NavBar from "./Nav-bar";
type LayoutProps = {
  children: JSX.Element;
}

const Layout = ({ children }: LayoutProps) => {
  const [scrollH, setScrollH] = useState(0);

  useEffect(() => {
    const handleScroll: EventListener = () => {
      setScrollH(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll, true);
    
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])
 
  return (
    <>
      <Meta />
      <NavBar scrollY={scrollH} />
      {children}
    </>
  )
}

export default Layout;