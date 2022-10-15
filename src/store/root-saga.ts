import { all, call } from 'redux-saga/effects';
// import { categoriesSaga } from './category/categories.saga';
import { userSaga } from './user/user.saga';

export default function* rootSaga(): Generator<unknown, any, unknown> {
  yield all([userSaga()]);
  // yield all([categoriesSaga(), userSaga()]);
  // yield all([call(categoriesSaga), call(userSaga)]);
}
