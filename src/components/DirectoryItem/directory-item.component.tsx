import * as React from 'react';
import { Link } from 'react-router-dom';
import { DirectoryItemType } from '../../types';
export type DirectoryItemProps = {
  item: DirectoryItemType;
};

const DirectoryItem: React.FC<DirectoryItemProps> = ({ item }) => {
  const { title, imageUrl } = item;

  return (
    <Link to={`/shop/${title.name}`}>
      <img className="max-w-full" src={imageUrl} alt="" />
      <div className="mt-2 flex justify-center text-lg">{title.displayName}</div>
    </Link>
  );
};

export default DirectoryItem;
