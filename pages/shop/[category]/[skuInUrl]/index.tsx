import { useRouter } from "next/router";
import { allSkus } from "@/src/types";
import Custom404 from "pages/404";
import Product from "@/components/Product";

const ProductPage = () => {
  const router = useRouter();
  const skuInUrl = router.query?.skuInUrl as string;

  return allSkus.includes(skuInUrl) ? <Product /> : <Custom404 />;
  
}

export default ProductPage;