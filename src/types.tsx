import { store } from './store/store';
import { User } from 'firebase/auth';
import menJeans from './data/men-jeans';
import menActivewear from './data/men-activewear';
import menShirts from './data/men-shirts';
import menOutwear from './data/men-outwear';
import womenActivewear from './data/women-activewear';
import womenDresses from './data/women-dresses';
import womenJeans from './data/women-jeans';
import womenTops from './data/women-tops';

export type OnAuthNextFnType = (user: User | null) => void;

export type UseParamsCategoryType = {
  category: string;
};
export type UseParamsSkuType = {
  skuInUrl: string;
};
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

export const allSkus = new Array().concat(
  menJeans.map((el) => el.sku),
  menActivewear.map((el) => el.sku),
  menShirts.map((el) => el.sku),
  menOutwear.map((el) => el.sku),
  womenActivewear.map((el) => el.sku),
  womenDresses.map((el) => el.sku),
  womenJeans.map((el) => el.sku),
  womenTops.map((el) => el.sku)
);
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
export type CategoriesMap = Record<string, Product[]>;
export interface Catalog {
  mainCat: MainCategoryType;
  subCat: string;
  items: Product[];
}
export interface CategoriesState {
  categoriesArray: Catalog[];
  isLoading: boolean;
  error: Error | null;
}

export interface CartState {
  isCartOpen: boolean;
  itemsInCart: CartItemType[];
}
export interface UserState {
  currentUser: User | null;
  isLoading: boolean;
  error: unknown | null;
}
export interface BaseState {
  categories: CategoriesState;
  cart: CartState;
  user: UserState;
}

export type AppDispatch = typeof store.dispatch;

export const objIsEmpty = (object: object) => Object.keys(object).length == 0;