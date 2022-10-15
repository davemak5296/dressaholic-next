import { createSelector } from '@reduxjs/toolkit';
import { BaseState } from '../../types';

export const selectUserReducer = (grandState: BaseState) => grandState.user;

export const selectCurrentUser = createSelector(
  [selectUserReducer],
  (userSlice) => userSlice.currentUser
);
