import Product from "@/components/Product";
import { GetServerSideProps } from "next";
import NavBar from "@/components/Nav-bar";
import useNavbarHeight from "@/src/hooks/useNavbarHeight";
import { getCategoriesAndDocs } from "@/src/utils/firebase/firebase.utils";
import Custom404 from "pages/404";
import Footer from "@/components/Footer";
type ProductPageProps = {
  isAuth: boolean;
  product: Product | null;
  paramSku: string;
}

export const getServerSideProps: GetServerSideProps<ProductPageProps>= async ({req, params}) => {
  const isAuth = req.cookies.user ? true : false;
  const paramCat = params?.category as string;
  const paramSku = params?.skuInUrl as string;

  const catalogs = await getCategoriesAndDocs();
  const product = catalogs.find( e => e.subCat == paramCat )?.items.find( e => e.sku == paramSku)

  return {
    props: {
      isAuth,
      product: product ?? null,
      paramSku
    }
  }
}

const ProductPage = ( {isAuth, product, paramSku }: ProductPageProps) => {
  const { scrollH } = useNavbarHeight();

  return (
    <div className="flex flex-col min-h-screen">
      <NavBar isAuth={isAuth} scrollY={scrollH} />
      { !!product ? <Product param={paramSku} product={product} /> : <Custom404 />}
      <Footer />
    </div>
  )
}

export default ProductPage;