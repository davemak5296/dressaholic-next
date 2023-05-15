import {useState, ChangeEventHandler, FormEventHandler } from 'react';
import { useCookies } from 'react-cookie';
import { useRouter } from 'next/router';
import FormInput from '@/components/FormInput/Form-input';
import Spinner from './Spinner';
import { popUpError, signInAuthUserWithEmailAndPw, signInWithGooglePopup } from '@/src/utils/firebase/firebase.utils';

const defaultFormFields = {
  email: '',
  password: '',
};

const SignInForm = () => {
  const [ cookies, setCookie ] = useCookies();
  const router = useRouter();
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { email, password } = formFields;
  const [isLoading, setIsLoading] = useState(false);

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };

  const signInWithGoogle = () => {
    const handler = async () => {
      try {
        const user = await signInWithGooglePopup();
        setCookie('user', user.user.uid, {
          path: '/',
          maxAge: 3600
        })

        router.push('/');
        setIsLoading(false)

      } catch (error: unknown) {
        setIsLoading(false)
        popUpError(error);
      }
    }
    setIsLoading(true);
    handler().catch();
  };

  const handleSubmit: FormEventHandler<HTMLFormElement> = (event) => {
    const handler = async () => {
      event.preventDefault();

      try {
        const user = await signInAuthUserWithEmailAndPw(email, password);
        if (!user) {
          setIsLoading(false);
          alert('no user found!');
          return
        } else {
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
        resetFormFields();
      }
    };

    setIsLoading(true);
    handler().catch(Error);
  };

  const handleChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value });
  };

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
