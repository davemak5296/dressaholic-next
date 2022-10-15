import { store } from './store/store';
import { User } from 'firebase/auth';

export type OnAuthNextFnType = (user: User | null) => void;
export interface BaseCategoryType {
  id: number;
  name: string;
  sub_categories: SubCategoryType | SubCategoryType[];
}

export interface SubCategoryType {
  id: number;
  name: string;
  master: BaseCategoryType;
}

export interface UserState {
  currentUser: User | null;
  isLoading: boolean;
  error: unknown | null;
}
export interface BaseState {
  // categories: CategoriesState;
  // cart: CartState;
  user: UserState;
}

export type AppDispatch = typeof store.dispatch;
