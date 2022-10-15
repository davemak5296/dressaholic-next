import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from 'firebase/auth';
import { BaseState } from '../../types';

export const userSlice = createSlice({
  name: 'user',

  initialState: {
    currentUser: null,
    isLoading: false,
    error: null,
  },

  reducers: {
    CHECK_USER_SESSION: () => {},
    SIGN_UP_START: (state: BaseState['user'], action) => {
      state.isLoading = true;
    },
    SIGN_UP_SUCCESS: (state: BaseState['user'], action) => {
      state.isLoading = false;
    },
    SIGN_UP_FAILED: (state: BaseState['user'], { payload }: PayloadAction<unknown>) => {
      state.error = payload;
    },
    GOOGLE_SIGN_IN_START: (state: BaseState['user']) => {
      state.isLoading = true;
    },
    EMAIL_SIGN_IN_START: (state: BaseState['user'], action) => {
      state.isLoading = true;
    },
    SIGN_IN_SUCCESS: (state: BaseState['user'], { payload }: PayloadAction<User>) => {
      state.isLoading = false;
      state.currentUser = payload;
    },
    SIGN_IN_FAILED: (state: BaseState['user'], { payload }: PayloadAction<unknown>) => {
      state.isLoading = false;
      state.error = payload;
    },
    SIGN_OUT_START: (state: BaseState['user']) => {
      state.isLoading = true;
    },
    SIGN_OUT_SUCCESS: (state: BaseState['user']) => {
      state.currentUser = null;
    },
    SIGN_OUT_FAILED: (state: BaseState['user'], { payload }: PayloadAction<unknown>) => {
      state.error = payload;
    },
  },
});

export const {
  CHECK_USER_SESSION,
  SIGN_UP_START,
  SIGN_UP_SUCCESS,
  SIGN_UP_FAILED,
  GOOGLE_SIGN_IN_START,
  EMAIL_SIGN_IN_START,
  SIGN_IN_SUCCESS,
  SIGN_IN_FAILED,
  SIGN_OUT_START,
  SIGN_OUT_SUCCESS,
  SIGN_OUT_FAILED,
} = userSlice.actions;
export default userSlice.reducer;
