import { useRouter } from "next/router";
import { allSkus } from "@/src/types";
import Product from "@/components/Product";
import PageWrapper from "@/components/Page-wrapper";

const ProductPage = () => {
  const router = useRouter();
  const skuInUrl = router.query?.skuInUrl as string;

  return <PageWrapper isValidPage={allSkus.includes(skuInUrl)} page={<Product />} />
}

export default ProductPage;