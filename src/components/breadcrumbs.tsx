import * as React from 'react';
import { Link, useParams } from 'react-router-dom';
import { subCatDisplayNameMap, UseParamsCategoryType, UseParamsSkuType } from '../types';

const Breadcrumbs: React.FC = () => {
  const { category } = useParams<keyof UseParamsCategoryType>() as UseParamsCategoryType;
  const { skuInUrl } = useParams<keyof UseParamsSkuType>() as UseParamsSkuType;

  return (
    <div className="daisy-breadcrumbs col-span-full row-span-1 row-start-1 text-gray-400 ">
      <ul>
        <li className="hover:text-primary-focus">
          <Link to="/">Home</Link>
        </li>
        {category && (
          <>
            <li className="hover:text-primary-focus hover:before:opacity-90">
              <Link to={`/shop/${subCatDisplayNameMap[category]['mainCat']}`}>
                {subCatDisplayNameMap[category]['mainCat']}
              </Link>
            </li>
            <li className="hover:text-primary-focus hover:before:opacity-90">
              <Link to={`/shop/${category}`}>{subCatDisplayNameMap[category]['displayName']}</Link>
            </li>
          </>
        )}
        {skuInUrl && (
          <li className="hover:text-primary-focus hover:before:opacity-90">
            <Link to="/shop">{skuInUrl}</Link>
          </li>
        )}
      </ul>
    </div>
  );
};

export default React.memo(Breadcrumbs);
