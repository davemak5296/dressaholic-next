import { Product, subCatDisplayNameMap } from '@/src/types';
import Category from "@/components/Category";
import { GetServerSideProps } from "next";
import NavBar from "@/components/Nav-bar";
import ShopLanding from "@/components/Shop-landing";
import useNavbarHeight from "@/src/hooks/useNavbarHeight";
import { getCategoriesAndDocs } from '@/src/utils/firebase.utils';
import Custom404 from 'pages/404';
import Footer from '@/components/Footer';
import { verifyAuthStatus } from '@/src/utils/verifyAuthStatus';
type CategoryPageProps = {
  isAuth: boolean;
  param: string;
  products: Product[] | null;
}

export const getServerSideProps: GetServerSideProps<CategoryPageProps>= async ({ req, params }) => {
  const { csrf , session } = req.cookies;
  const { isAuth } = await verifyAuthStatus(csrf, session);

  const param = params?.category as string;
  const catalogs = await getCategoriesAndDocs();
  const productsInCat = catalogs.find( e => e.subCat == param )?.items
  
  return {
    props: {
      isAuth,
      param,
      products: productsInCat ?? null  // if products is undefined, return null
    }
  }
}

const CategoryPage = ( { isAuth, param, products }: CategoryPageProps ) => {
  const { scrollH } = useNavbarHeight();
  
  return (
    <div className='flex flex-col min-h-screen'>
      <NavBar isAuth={isAuth} scrollY={scrollH} />
      { param == 'men'
        ? <ShopLanding category="Men" />
        : param == 'women'
          ? <ShopLanding category="Women" />
          : !!products  // when products is not null, e.g. param is a valid category
            ? <Category categoryName={param} fullProducts={products} />
            : <Custom404 />
      }
      <Footer />
    </div>
  )
}

export default CategoryPage;