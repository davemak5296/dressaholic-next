import { subCatDisplayNameMap } from '@/src/types';
import Category from "@/components/Category";
import PageWrapper from "@/components/Page-wrapper";
import { GetServerSideProps } from "next";
import NavBar from "@/components/Nav-bar";
import ShopLanding from "@/components/Shop-landing";
import useNavbarHeight from "@/src/hooks/useNavbarHeight";
type CategoryPageProps = {
  isAuth: boolean;
  param: string
}

export const getServerSideProps: GetServerSideProps<CategoryPageProps>= async (context) => {
  const userCookie = context.req.cookies.user;
  const param = context.params?.category as string;

  return !userCookie
    ? {
      props: {
        isAuth: false,
        param: param
      } 
    }
    : {
      props: {
        isAuth: true,
        param: param
      } 
    }
}

const CategoryPage = ( { isAuth, param }: CategoryPageProps ) => {
  const { scrollH } = useNavbarHeight();
  
  return (
    <div className='flex flex-col min-h-screen'>
      <NavBar isAuth={isAuth} scrollY={scrollH} />
      { param == 'men'
          ? <ShopLanding category="Men" />
          : param == 'women'
            ? <ShopLanding category="Women" />
            : <PageWrapper isValidPage={Object.keys(subCatDisplayNameMap).includes(param)} page={<Category />} />
          }
    </div>
  )
}

export default CategoryPage;