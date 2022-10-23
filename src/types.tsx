import { store } from './store/store';
import { User } from 'firebase/auth';

export type OnAuthNextFnType = (user: User | null) => void;

export type UseParams = {
  category: string;
};
export type MainCategoryType = 'Men' | 'Women';

export type SubCategoryType = {
  name: string;
  displayName: string;
};

export const subCatDisplayNameMap: Record<string, string> = {
  'men-activewar': 'Shirts',
  'men-outwear': 'Jackets & Outwear',
  'men-jeans': 'Pants & Jeans',
  'men-activewear': 'Activewear',
  'women-tops': 'Tops',
  'women-dresses': 'Dresses & Skirts',
  'women-jeans': 'Pants & Jeans',
  'women-activewear': 'Activewear',
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
export type CartItem = Product & { qty: number };
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
export interface UserState {
  currentUser: User | null;
  isLoading: boolean;
  error: unknown | null;
}
export interface BaseState {
  categories: CategoriesState;
  // cart: CartState;
  user: UserState;
}

export type AppDispatch = typeof store.dispatch;
