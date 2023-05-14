import { useRouter } from "next/router";
import { allSkus } from "@/src/types";
import Product from "@/components/Product";
import PageWrapper from "@/components/Page-wrapper";
import { GetServerSideProps } from "next";
import NavBar from "@/components/Nav-bar";
import useNavbarHeight from "@/src/hooks/useNavbarHeight";
type ProductPageProps = {
  isAuth: boolean;
  param: string
}

export const getServerSideProps: GetServerSideProps<ProductPageProps>= async (context) => {
  const userCookie = context.req.cookies.user;
  const param = context.params?.skuInUrl as string;

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

const ProductPage = ( {isAuth, param }: ProductPageProps) => {
  const { scrollH } = useNavbarHeight();

  return (
    <div className="flex flex-col min-h-screen">
      <NavBar isAuth={isAuth} scrollY={scrollH} />
      <PageWrapper isValidPage={allSkus.includes(param)} page={<Product />} />
    </div>
  )
}

export default ProductPage;