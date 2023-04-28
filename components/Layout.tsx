import Meta from "./Meta";
type LayoutProps = {
  children: JSX.Element;
}
const Layout = ({ children }: LayoutProps) => {
  return (
    <>
      <Meta />
      <main className="w-[1000px] mx-auto border-4 border-blue-300">
        {/* <div className="text-2xl">I am from Layout</div> */}
        {children}
      </main>
    </>
  )
}

export default Layout;