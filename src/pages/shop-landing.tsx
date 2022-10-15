import * as React from 'react';
import DirectoryItem from '../components/DirectoryItem/directory-item.component';
import { DirectoryItemType } from '../types';

const directoryItems: DirectoryItemType[] = [
  {
    id: 1,
    mainCategory: 'Men',
    title: 'Shirts',
    imageUrl: './maincat-men-shirts.webp',
  },
  {
    id: 2,
    mainCategory: 'Men',
    title: 'Jackets & Outwear',
    imageUrl: './maincat-men-jackets-and-outwear.webp',
  },
  {
    id: 3,
    mainCategory: 'Men',
    title: 'Pants & Jeans',
    imageUrl: './maincat-men-pants-and-jeans.webp',
  },
  {
    id: 4,
    mainCategory: 'Men',
    title: 'Activewear',
    imageUrl: './maincat-men-activewear.webp',
  },
  {
    id: 5,
    mainCategory: 'Women',
    title: 'Tops',
    imageUrl: './maincat-women-tops.webp',
  },
  {
    id: 6,
    mainCategory: 'Women',
    title: 'Dresses & Skirts',
    imageUrl: './maincat-women-dresses-and-skirts.webp',
  },
  {
    id: 7,
    mainCategory: 'Women',
    title: 'Pants & Jeans',
    imageUrl: './maincat-women-pants-and-jeans.webp',
  },
  {
    id: 8,
    mainCategory: 'Women',
    title: 'Activewear',
    imageUrl: './maincat-women-activewear.webp',
  },
];

const ShopLanding: React.FC = () => {
  return (
    <div className="mb-12">
      <h1 className="py-4 text-3xl">For Men</h1>
      <section className="grid grid-cols-4">
        {directoryItems.map(
          (item) => item.mainCategory == 'Men' && <DirectoryItem key={item.id} item={item} />
        )}
      </section>

      <h1 className="mt-10 py-4 text-3xl">For Women</h1>
      <section className="grid grid-cols-4">
        {directoryItems.map(
          (item) => item.mainCategory == 'Women' && <DirectoryItem key={item.id} item={item} />
        )}
      </section>
    </div>
  );
};

export default ShopLanding;
