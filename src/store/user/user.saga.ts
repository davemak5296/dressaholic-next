import { User } from 'firebase/auth';
import { FirebaseError } from 'firebase/app';
import { PayloadAction } from '@reduxjs/toolkit';
import { all, call, put, takeLatest } from 'redux-saga/effects';
import {
  createAuthUserWithEmailAndPw,
  createUserDocFromAuth,
  getCurrentUser,
  signInAuthUserWithEmailAndPw,
  signInWithGooglePopup,
  signOutUser,
} from '../../utils/firebase/firebase.utils';
import {
  CHECK_USER_SESSION,
  EMAIL_SIGN_IN_START,
  GOOGLE_SIGN_IN_START,
  SIGN_IN_FAILED,
  SIGN_IN_SUCCESS,
  SIGN_OUT_FAILED,
  SIGN_OUT_START,
  SIGN_OUT_SUCCESS,
  SIGN_UP_FAILED,
  SIGN_UP_START,
  SIGN_UP_SUCCESS,
} from './user.reducer';

export function* getSnapShotFromUserAuth(
  userAuth: User,
  additionalInfo: object = {}
): Generator<any, any, any> {
  try {
    yield call(createUserDocFromAuth, userAuth, additionalInfo);
    yield put(SIGN_IN_SUCCESS(userAuth));
  } catch (error) {
    yield put(SIGN_IN_FAILED(error));
  }
}

export function* isUserAuthenticated(): Generator<any, any, any> {
  try {
    const userAuth = yield call(getCurrentUser);
    if (!userAuth) return;
    yield call(getSnapShotFromUserAuth, userAuth, {});
  } catch (error) {
    yield put(SIGN_IN_FAILED(error));
  }
}

export function* signUp({
  payload,
}: PayloadAction<{ email: string; password: string; displayName: string }>): Generator<
  any,
  any,
  any
> {
  const { email, password, displayName } = payload;
  const additionalInfo = { displayName };

  try {
    const { user } = yield call(createAuthUserWithEmailAndPw, email, password);
    yield put(SIGN_UP_SUCCESS({ user, additionalInfo }));
  } catch (error) {
    yield put(SIGN_UP_FAILED(error));
  }
}
export function* signInAfterSignUp({
  payload,
}: PayloadAction<{ user: User; additionalInfo: { [key: string]: string } }>): Generator<
  any,
  any,
  any
> {
  const { user, additionalInfo } = payload;
  yield call(getSnapShotFromUserAuth, user, additionalInfo);
}
export function* signInWithEmail({
  payload,
}: PayloadAction<{ email: string; password: string }>): Generator<any, any, any> {
  const { email, password } = payload;

  try {
    const { user } = yield call(signInAuthUserWithEmailAndPw, email, password);
    if (!user) {
      console.log('no user found');
      return;
    }
    yield call(getSnapShotFromUserAuth, user);
  } catch (error) {
    if (error instanceof FirebaseError) {
      yield put(SIGN_IN_FAILED(error));
    }
  }
}
export function* signInWithGoogle(): Generator<any, any, any> {
  try {
    const { user } = yield call(signInWithGooglePopup);
    yield call(getSnapShotFromUserAuth, user);
  } catch (error) {
    if (error instanceof FirebaseError) {
      yield put(SIGN_IN_FAILED(error));
    }
  }
}
export function* signOut(): Generator<any, any, any> {
  try {
    yield call(signOutUser);
    yield put(SIGN_OUT_SUCCESS());
  } catch (error) {
    yield put(SIGN_OUT_FAILED(error));
  }
}
export function* popUpError({ payload }: PayloadAction<unknown>): Generator<any, any, any> {
  if (payload instanceof FirebaseError) {
    switch (payload.code) {
      case 'auth/wrong-password':
        alert('Wrong password.');
        break;
      case 'auth/user-not-found':
        alert('User not exists.');
        break;
      case 'auth/email-already-in-use':
        alert('Cannot sign up, email already in use.');
        break;
      default:
        console.log(payload.code);
        break;
    }
  } else {
    console.log(payload);
  }
}
export function* onCheckUserSession(): Generator<unknown, any, unknown> {
  yield takeLatest(CHECK_USER_SESSION, isUserAuthenticated);
}
export function* onSignUpStart(): Generator<unknown, any, unknown> {
  yield takeLatest(SIGN_UP_START, signUp);
}
export function* onSignUpSucess(): Generator<unknown, any, unknown> {
  yield takeLatest(SIGN_UP_SUCCESS, signInAfterSignUp);
}
export function* onEmailSignInStart(): Generator<unknown, any, unknown> {
  yield takeLatest(EMAIL_SIGN_IN_START, signInWithEmail);
}
export function* onGoogleSignInStart(): Generator<unknown, any, unknown> {
  yield takeLatest(GOOGLE_SIGN_IN_START, signInWithGoogle);
}
export function* onSignOutStart(): Generator<any, any, any> {
  yield takeLatest(SIGN_OUT_START, signOut);
}
export function* onAuthError(): Generator<any, any, any> {
  yield takeLatest([SIGN_IN_FAILED, SIGN_UP_FAILED, SIGN_OUT_FAILED], popUpError);
}
export function* userSaga(): Generator<unknown, any, unknown> {
  yield all([
    call(onCheckUserSession),
    call(onSignUpStart),
    call(onSignUpSucess),
    call(onEmailSignInStart),
    call(onGoogleSignInStart),
    call(onSignOutStart),
    call(onAuthError),
  ]);
}
