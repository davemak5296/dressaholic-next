import Link from 'next/link';
import { DirectoryItemType } from '@/src/types';
export type DirectoryItemProps = {
  item: DirectoryItemType;
};

const DirectoryItem = ({ item: { title, imageUrl} }: DirectoryItemProps) => {

  return (
    <Link href={`/shop/${title.name}`} tabIndex={0}>
      <img className="max-w-full" src={imageUrl} alt="" />
      <div className="mt-2 flex justify-center text-lg">{title.displayName}</div>
    </Link>
  );
};

export default DirectoryItem;
