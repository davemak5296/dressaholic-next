import * as React from 'react';
import { Link } from 'react-router-dom';

const Breadcrumbs: React.FC = () => {
  return (
    <div className="daisy-breadcrumbs col-span-full row-span-1 row-start-1 text-gray-400 ">
      <ul>
        <li className="hover:text-primary-focus">
          <Link to="/">Home</Link>
        </li>
        <li className="hover:text-primary-focus">
          <Link to="/shop">Shop</Link>
        </li>
      </ul>
    </div>
  );
};

export default Breadcrumbs;
