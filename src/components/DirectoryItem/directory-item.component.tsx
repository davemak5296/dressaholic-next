import * as React from 'react';
import { DirectoryItemType } from '../../types';
export type DirectoryItemProps = {
  item: DirectoryItemType;
};

const DirectoryItem: React.FC<DirectoryItemProps> = ({ item }) => {
  const { title, imageUrl } = item;

  return (
    <div>
      <img className="max-w-[200px]" src={imageUrl} alt="" />
      <div className="mt-2 flex max-w-[200px] justify-center text-lg">{title}</div>
    </div>
  );
};

export default DirectoryItem;
