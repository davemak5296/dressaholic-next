import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CHECK_USER_SESSION } from './store/user/user.reducer';
import { selectCurrentUser } from './store/user/user.selector';
import { Routes, Route, Navigate } from 'react-router-dom';
import PageLayout from './pages/page-layout';
import Home from './pages/home';
import Cart from './pages/cart';
import Shop from './pages/shop';
import Authentication from './pages/authentication';
import { addCollectionAndDocs } from './utils/firebase/firebase.utils';
import { catalogs } from './data/toFirebase';
import { SET_CATEGORIES } from './store/category/categories.reducer';
import OrderPage from './pages/order-page';

const App: React.FC = () => {
  const dispatch = useDispatch();
  const currUser = useSelector(selectCurrentUser);

  React.useEffect(() => {
    dispatch(CHECK_USER_SESSION());
  }, []);

  React.useEffect(() => {
    dispatch(SET_CATEGORIES());
  }, []);

  // React.useEffect(() => {
  //   addCollectionAndDocs('dressaholic-products', catalogs);
  // }, []);

  return (
    <Routes>
      <Route element={<PageLayout />}>
        <Route index element={<Home />} />
        <Route path="shop/*" element={<Shop />} />
        <Route path="cart" element={<Cart />} />
        <Route path="place-order" element={<OrderPage />} />
        <Route path="auth" element={currUser ? <Navigate to="/" /> : <Authentication />} />
      </Route>
    </Routes>
  );
};

export default App;
