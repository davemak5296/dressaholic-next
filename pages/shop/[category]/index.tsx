import { useRouter } from "next/router";
import { subCatDisplayNameMap } from '@/src/types';
import Custom404 from "pages/404";
import Category from "@/components/Category";

const CategoryPage = () => {
  const router = useRouter();
  const category = router.query?.category as string;

  return Object.keys(subCatDisplayNameMap).includes(category) ? <Category /> : <Custom404 />;
  // return Object.keys(subCatDisplayNameMap).includes(category) ? (
  //   <div className="text-3xl mt-20">{category}</div>
  // ) : <Custom404 />;
}

export default CategoryPage;