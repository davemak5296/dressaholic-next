import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import Meta from "./Meta";
import { SET_CATEGORIES } from "@/src/store/category/categories.reducer";
type LayoutProps = {
  children: JSX.Element;
}

const Layout = ({ children }: LayoutProps) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(SET_CATEGORIES());
  }, [])
 
  return (
    <>
      <Meta />
      {children}
    </>
  )
}

export default Layout;