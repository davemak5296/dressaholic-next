import * as React from 'react';
import { Link, useParams } from 'react-router-dom';
import { subCatDisplayNameMap, UseParams } from '../types';

const Breadcrumbs: React.FC = () => {
  const { category } = useParams<keyof UseParams>() as UseParams;
  console.log(category);

  return (
    <div className="daisy-breadcrumbs col-span-full row-span-1 row-start-1 text-gray-400 ">
      <ul>
        <li className="hover:text-primary-focus">
          <Link to="/">Home</Link>
        </li>
        <li className="hover:text-primary-focus hover:before:opacity-90">
          <Link to="/shop">Shop</Link>
        </li>
        {category && (
          <>
            <li className="hover:text-primary-focus hover:before:opacity-90">
              <Link to="/shop">{subCatDisplayNameMap[category]['mainCat']}</Link>
            </li>
            <li className="hover:text-primary-focus hover:before:opacity-90">
              <Link to="/shop">{subCatDisplayNameMap[category]['displayName']}</Link>
            </li>
          </>
        )}
      </ul>
    </div>
  );
};

export default Breadcrumbs;
