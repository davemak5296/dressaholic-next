import { createSlice } from '@reduxjs/toolkit';
import { Catalog, CategoriesMap, BaseState } from '../../types';

export const categoriesSlice = createSlice({
  name: 'categories',

  initialState: {
    categoriesArray: [] as Catalog[],
    isLoading: false,
    error: null,
  } as BaseState['categories'],

  reducers: {
    SET_CATEGORIES: () => {},
    FETCH_CATEGORIES_START: (state: BaseState['categories']) => {
      state.isLoading = true;
    },
    FETCH_CATEGORIES_SUCCESS: (state: BaseState['categories'], action) => {
      state.isLoading = false;
      state.categoriesArray = action.payload;
    },
    FETCH_CATEGORIES_FAIL: (state: BaseState['categories'], action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export const {
  SET_CATEGORIES,
  FETCH_CATEGORIES_START,
  FETCH_CATEGORIES_FAIL,
  FETCH_CATEGORIES_SUCCESS,
} = categoriesSlice.actions;
export default categoriesSlice.reducer;
