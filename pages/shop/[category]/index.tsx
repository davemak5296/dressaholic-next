import { useRouter } from "next/router";
import { subCatDisplayNameMap } from '@/src/types';
import Category from "@/components/Category";
import PageWrapper from "@/components/Page-wrapper";

const CategoryPage = () => {
  const router = useRouter();
  const category = router.query?.category as string;

  return <PageWrapper isValidPage={Object.keys(subCatDisplayNameMap).includes(category)} page={<Category />} />
}

export default CategoryPage;