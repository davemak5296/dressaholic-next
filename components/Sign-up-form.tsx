import {useState, FormEventHandler, ChangeEventHandler, useEffect} from 'react';
import FormInput from './FormInput/Form-input';
import Spinner from './Spinner';
import { createAuthUserWithEmailAndPw, createUserDocFromAuth, popUpError } from '@/src/utils/firebase/firebase.utils';
import { useCookies } from 'react-cookie';
import { useRouter } from 'next/router';

const SignUpForm = () => {
  const [ cookies, setCookie ] = useCookies();
  const router = useRouter();
  const [formFields, setFormFields] = useState({
  displayName: '',
  email: '',
  password: '',
  confirmPassword: '',
});
  const { displayName, email, password, confirmPassword } = formFields;
  const [isLoading, setIsLoading] = useState(false);

  const resetPwFields = () => {
    setFormFields({ ...formFields, password: '', confirmPassword: ''});
  };

  const handleSubmit: FormEventHandler<HTMLFormElement> = (event) => {
    const handler = async () => {
      event.preventDefault();

      if (password !== confirmPassword) {
        alert('Passwords unmatch!');
        resetPwFields();
        return;
      }
      try {
        setIsLoading(true);
        const user = await createAuthUserWithEmailAndPw(email, password);
        if (!!user && 'user' in user) {
          await createUserDocFromAuth(user.user, { displayName });
          setCookie('user', user.user.uid, {
            path: '/',
            maxAge: 3600
          })
          alert('You have successfully registered!\n\nWe will bring you back to home page.')
          router.push('/');
          setIsLoading(false)
        }
        resetPwFields();
      } catch (error: unknown) {
        setIsLoading(false)
        popUpError(error);
        resetPwFields();
      }
    };

    handler().catch(Error);
  };

  const handleChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value });
  };
  
  return (
    <>
      {isLoading && <Spinner />}
      <div className="mt-10 flex w-full flex-col px-2 xs:w-[380px] xs:px-0 lg:mt-0 lg:pl-4">
        <h2 className="mx-auto my-2.5 text-2xl font-bold xs:mx-0">Don&apos;t have an account?</h2>
        <span className="mx-auto xs:mx-0">Sign up with your email and password</span>
        <form action="" onSubmit={handleSubmit}>
          <FormInput
            label="Display Name"
            type="text"
            onChange={handleChange}
            name="displayName"
            value={displayName}
            required
          />
          <FormInput
            label="Email"
            type="email"
            onChange={handleChange}
            name="email"
            value={email}
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
          <FormInput
            label="Confirm Password"
            type="password"
            onChange={handleChange}
            name="confirmPassword"
            value={confirmPassword}
            required
          />
          <div className="flex flex-col xs:flex-row">
            <button type="submit" className="daisy-btn-primary px-8 py-4 uppercase">
              sign up
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default SignUpForm;
