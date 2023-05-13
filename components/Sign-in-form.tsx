import {useState, ChangeEventHandler, FormEventHandler, useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useCookies } from 'react-cookie';
import { useRouter } from 'next/router';
import FormInput from '@/components/FormInput/Form-input';
import {
  EMAIL_SIGN_IN_START,
  GOOGLE_SIGN_IN_START,
  SIGN_IN_FAILED,
} from '@/store/user/user.reducer';
import { selectCurrentUser, selectUserError } from '@/src/store/user/user.selector';
import Spinner from './Spinner';
import { popUpError, signInAuthUserWithEmailAndPw } from '@/src/utils/firebase/firebase.utils';

const defaultFormFields = {
  email: '',
  password: '',
};

const SignInForm = () => {
  const dispatch = useDispatch();
  const [ cookies, setCookie, removeCookie ] = useCookies();
  const router = useRouter();
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { email, password } = formFields;
  const currUser = useSelector(selectCurrentUser);
  const err = useSelector(selectUserError);
  const [isLoading, setIsLoading] = useState(false);

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };

  const signInWithGoogle = () => {
    dispatch(GOOGLE_SIGN_IN_START());
  };

  const handleSubmit: FormEventHandler<HTMLFormElement> = (event) => {
    const handler = async () => {
      event.preventDefault();

      try {
        // dispatch(EMAIL_SIGN_IN_START({ email, password }));
        setIsLoading(true);
        const user = await signInAuthUserWithEmailAndPw(email, password);
        if (!user) {
          setIsLoading(false);
          alert('no user found!');
          return
        } else {
          // console.log(JSON.stringify(user, null, 2));
          setCookie('user', user.user.uid, {
            path: '/',
            maxAge: 3600
          })
          router.push('/');
          setIsLoading(false);
        }
        resetFormFields();
      } catch (error: unknown) {
        setIsLoading(false);
        popUpError(error);
        // dispatch(SIGN_IN_FAILED(error));
        // console.log(JSON.stringify(error, null, 2))
        resetFormFields();
      }
    };

    handler().catch(Error);
  };

  const handleChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value });
  };

  useEffect(() => {
    if (currUser || err ) setIsLoading(false);
  }, [currUser, err])

  return (
    <>
      {isLoading && <Spinner />}
      <div className="flex w-full flex-col px-2 xs:w-[380px] xs:px-0">
        <h2 className="my-2.5 mx-auto text-2xl font-bold xs:mx-0">I already have an account</h2>
        <span className="mx-auto xs:mx-0">Sign in with your email and password</span>
        <form action="" onSubmit={handleSubmit}>
          <FormInput
            label="Email"
            type="email"
            onChange={handleChange}
            name="email"
            value={email}
            aria-label="email"
            required
          />
          <FormInput
            label="Password"
            type="password"
            onChange={handleChange}
            name="password"
            value={password}
            required
          />
          <div className="flex flex-col justify-evenly xs:flex-row">
            <button type="submit" className="daisy-btn-primary px-8 py-4 uppercase">
              sign in
            </button>
            <button
              onClick={signInWithGoogle}
              type="button"
              className="daisy-btn-secondary px-8 py-4 uppercase"
            >
              sign in with google
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default SignInForm;
