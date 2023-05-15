import Meta from "./Meta";
type LayoutProps = {
  children: JSX.Element;
}

const Layout = ({ children }: LayoutProps) => (
  <>
    <Meta />
    {children}
  </>
)


export default Layout;