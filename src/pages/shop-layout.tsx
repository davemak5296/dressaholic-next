import * as React from 'react';
import { Outlet } from 'react-router';

const ShopLayout: React.FC = () => {
  return (
    <main className="main-container grid h-[1000px] grid-cols-4 border border-solid border-red-500">
      <div className="relative top-0 col-span-1 border border-solid border-blue-500">
        <div className="sticky top-[52px]">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga voluptate laudantium,
          adipisci quibusdam eaque commodi deserunt fugiat mollitia est debitis distinctio aut quam
          cum accusantium. Doloremque voluptate libero rem aliquam nemo dignissimos tenetur
          repudiandae debitis possimus eius vero, perferendis a sint illo officia quibusdam ut in.
          Voluptatibus facere, non repudiandae molestias similique molestiae. Eligendi, sed quam
          earum laudantium assumenda illo enim eos facilis itaque hic soluta commodi iure aliquid
          asperiores temporibus corrupti eaque libero dolorem non accusamus nihil natus officia!
          Labore, laboriosam iure neque enim aut eius praesentium asperiores adipisci expedita
          voluptatum? Sunt id voluptates nesciunt. Architecto laboriosam consectetur beatae.
        </div>
      </div>
      <div className="col-span-4 col-start-2 border border-solid border-green-500">
        <Outlet />
      </div>
    </main>
  );
};

export default ShopLayout;
