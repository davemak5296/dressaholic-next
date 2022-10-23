import {
  SET_CATEGORIES,
  FETCH_CATEGORIES_START,
  FETCH_CATEGORIES_SUCCESS,
  FETCH_CATEGORIES_FAIL,
} from './categories.reducer';
import { getCategoriesAndDocs } from '../../utils/firebase/firebase.utils';
import { call, put, all, takeLatest } from 'redux-saga/effects';

export function* fetchCategories(): Generator<unknown, any, unknown> {
  yield put(FETCH_CATEGORIES_START());

  try {
    const categoriesArray = yield call(getCategoriesAndDocs);
    yield put(FETCH_CATEGORIES_SUCCESS(categoriesArray));
  } catch (error) {
    yield put(FETCH_CATEGORIES_FAIL(error));
  }
}
export function* onFetchCategories(): Generator<unknown, any, unknown> {
  yield takeLatest(SET_CATEGORIES, fetchCategories);
}
export function* categoriesSaga(): Generator<unknown, any, unknown> {
  yield all([call(onFetchCategories)]);
}
