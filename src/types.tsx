export type MainCategoryType = 'Men' | 'Women';

export type SubCategoryType = {
  name: string;
  displayName: string;
};

export const subCatDisplayNameMap: Record<string, { mainCat: string; displayName: string }> = {
  'men-shirts': {
    mainCat: 'Men',
    displayName: 'Shirt',
  },
  'men-outwear': {
    mainCat: 'Men',
    displayName: 'Jackets & Outwear',
  },
  'men-jeans': {
    mainCat: 'Men',
    displayName: 'Pants & Jeans',
  },
  'men-activewear': {
    mainCat: 'Men',
    displayName: 'Activewear',
  },
  'women-tops': {
    mainCat: 'Women',
    displayName: 'Tops',
  },
  'women-dresses': {
    mainCat: 'Women',
    displayName: 'Dresses & Skirts',
  },
  'women-jeans': {
    mainCat: 'Women',
    displayName: 'Pants & Jeans',
  },
  'women-activewear': {
    mainCat: 'Women',
    displayName: 'Activewear',
  },
};

export type DirectoryItemType = {
  id: number;
  mainCategory: MainCategoryType;
  title: SubCategoryType;
  imageUrl: string;
};

export interface Product {
  sku: string;
  brand: string;
  displayName: string;
  price: number;
  colors: string[];
  stocks: Record<string, ProductSizeType>;
  imageUrls: Record<string, ImageUrlsType>;
}

export type ProductSizeType = {
  sm: number;
  md: number;
  lg: number;
  xl: number;
};

export type ImageUrlsType = {
  thumbnail: string;
  one: string | null;
  two: string | null;
};
export type SizeType = 'sm' | 'md' | 'lg' | 'xl';
// export type CartItem = Product & { qty: number };
export type CartItemType = {
  // same item = same (sku, color and size)
  sku: string;
  brand: string;
  displayName: string;
  imageUrl: string;
  price: number;
  color: string;
  size: string;
  qty: number;
};
export interface Catalog {
  mainCat: MainCategoryType;
  subCat: string;
  items: Product[];
}
