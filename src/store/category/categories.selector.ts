import { createSelector } from '@reduxjs/toolkit';
import { CategoriesMap, BaseState } from '../../types';

const selectCategoriesReducer = (grandState: BaseState) => grandState.categories;

export const selectCategories = createSelector(
  [selectCategoriesReducer],
  (categoriesSlice) => categoriesSlice.categoriesArray
);
export const selectCategoriesMap = createSelector([selectCategories], (categoriesArray) =>
  categoriesArray.reduce<CategoriesMap>((acc, { subCat, items }) => {
    acc[subCat.toLowerCase()] = items;
    return acc;
  }, {})
);
