import { useRouter } from 'next/router';
import Link from 'next/link';
import { subCatDisplayNameMap } from '@/src/types';

const Breadcrumbs = () => {
  const router = useRouter();
  const category = router.query?.category as string;
  const skuInUrl = router.query?.skuInUrl as string;

  return (
    <div className="daisy-breadcrumbs col-span-full row-span-1 row-start-1 text-gray-400 ">
      <ul>
        <li className="hover:text-primary-focus">
          <Link href="/">Home</Link>
        </li>
        {category && (
          <>
            <li className="hover:text-primary-focus hover:before:opacity-90">
              <Link href={`/shop/${subCatDisplayNameMap[category]['mainCat'].toLocaleLowerCase()}`}>
                {subCatDisplayNameMap[category]['mainCat']}
              </Link>
            </li>
            <li className="hover:text-primary-focus hover:before:opacity-90">
              <Link href={`/shop/${category}`}>{subCatDisplayNameMap[category]['displayName']}</Link>
            </li>
          </>
        )}
        {skuInUrl && (
          <li className="hover:text-primary-focus hover:before:opacity-90">
            {skuInUrl}
          </li>
        )}
      </ul>
    </div>
  );
};

export default Breadcrumbs;
