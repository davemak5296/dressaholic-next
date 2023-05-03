import { useSelector } from "react-redux";
import { selectCatIsLoading } from "@/src/store/category/categories.selector";
import Custom404 from "pages/404";
import Spinner from "./Spinner";

type PageWrapperPropsType = {
  isValidPage: boolean,
  page: JSX.Element
}
const PageWrapper = ({ isValidPage, page }: PageWrapperPropsType) => {
  const catIsLoading = useSelector(selectCatIsLoading);

  return catIsLoading
    ? <Spinner />
    : isValidPage
      ? page
      : <Custom404 />
}

export default PageWrapper;