import * as React from 'react';
import DirectoryItem from '../components/DirectoryItem/directory-item.component';
import directoryItems from '../components/DirectoryItem/directory-item.data';

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
