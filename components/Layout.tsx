import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import Meta from "./Meta";
import NavBar from "./Nav-bar";
import { SET_CATEGORIES } from "@/src/store/category/categories.reducer";
type LayoutProps = {
  children: JSX.Element;
}

const Layout = ({ children }: LayoutProps) => {
  const [scrollH, setScrollH] = useState(0);
  const dispatch = useDispatch();

  useEffect(() => {
    const handleScroll: EventListener = () => {
      setScrollH(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll, true);
    
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    dispatch(SET_CATEGORIES());
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