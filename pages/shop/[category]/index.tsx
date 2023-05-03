import { useRouter } from "next/router";
import { subCatDisplayNameMap } from '@/src/types';
import Custom404 from "pages/404";
import Category from "@/components/Category";

const CategoryPage = () => {
  const router = useRouter();
  const category = router.query?.category as string;

  return Object.keys(subCatDisplayNameMap).includes(category) ? <Category /> : <Custom404 />;
}

export default CategoryPage;