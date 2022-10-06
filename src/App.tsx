import * as React from 'react';
import { Routes, Route } from 'react-router-dom';
import PageLayout from './pages/page-layout';
import Home from './pages/home';
import Cart from './pages/cart';
import Shop from './pages/shop';

const App: React.FC = () => {
  return (
    <Routes>
      <Route element={<PageLayout />}>
        <Route index element={<Home />} />
        <Route path="shop/*" element={<Shop />} />
        <Route path="cart" element={<Cart />} />
      </Route>
    </Routes>
  );
};

export default App;
