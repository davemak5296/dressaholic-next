import { FirebaseError, initializeApp } from 'firebase/app';
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  UserCredential,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  collection,
  CollectionReference,
  writeBatch,
  DocumentData,
  query,
  getDocs,
} from 'firebase/firestore';
import { Catalog } from '../types';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: `${process.env.NEXT_PUBLIC_FIREBASE_API_KEY}`,
  authDomain: 'ztm-crwn-2d3cc.firebaseapp.com',
  projectId: 'ztm-crwn-2d3cc',
  storageBucket: 'ztm-crwn-2d3cc.appspot.com',
  messagingSenderId: '698305848091',
  appId: '1:698305848091:web:46039c776d7f9cbf1629be',
};
// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
  prompt: 'select_account',
});
export const db = getFirestore(firebaseApp);
export const auth = getAuth(firebaseApp);
export const signInWithGooglePopup = () => signInWithPopup(auth, googleProvider);
export const createUserDocFromAuth = async (
  userAuth: UserCredential['user'],
  additionalInfo: object = {}
) => {
  if (!userAuth) return;
  const userDocRef = doc(db, 'users', userAuth.uid);
  const userSnapShot = await getDoc(userDocRef);

  if (!userSnapShot.exists()) {
    const { displayName, email } = userAuth;
    const createAt = new Date();
    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createAt,
        ...additionalInfo,
      });
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.log('error creating the user', error.message);
      }
    }
  }

  return userSnapShot;
};
export const createAuthUserWithEmailAndPw = async (email: string, pw: string) => {
  if (!email || !pw) return;
  return createUserWithEmailAndPassword(auth, email, pw);
};
export const signInAuthUserWithEmailAndPw = async (email: string, pw: string) => {
  if (!email || !pw) return;
  return signInWithEmailAndPassword(auth, email, pw);
};

export const initialCartForUser = async (uid: UserCredential['user']['uid']) => {
  const cartDocRef = doc(db, 'cart', uid);
  await setDoc(cartDocRef, {
    cart: []
  });
}

const createCollection = <T = DocumentData>(collectionName: string) =>
  collection(db, collectionName) as CollectionReference<T>;
export const addCollectionAndDocs = async (collectionKey: string, objectsToAdd: Catalog[]) => {
  const collectionRef = createCollection<Catalog>(collectionKey);

  const batch = writeBatch(db);

  objectsToAdd.forEach((obj) => {
    const docRef = doc(collectionRef, obj.subCat.toLowerCase());
    batch.set(docRef, obj);
  });

  await batch.commit();
  console.log('done');
};

export const getCategoriesAndDocs = async () => {
  const categoriesRef = createCollection<Catalog>('dressaholic-products');
  const q = query(categoriesRef);

  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map((doc) => doc.data());
};

export const popUpError = (error: FirebaseError | unknown) => {
  if (error instanceof FirebaseError) {
    switch (error.code) {
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
        alert(error.code.slice(5))
        break;
    }
  } else {
    console.log(error);
  }
}