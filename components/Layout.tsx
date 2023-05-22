import Meta from "./Meta";
type LayoutProps = {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => (
  <>
    <Meta />
    {children}
  </>
)


export default Layout;