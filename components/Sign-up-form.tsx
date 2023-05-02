import {useState, FormEventHandler, ChangeEventHandler, useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import FormInput from './FormInput/Form-input';
import { SIGN_UP_FAILED, SIGN_UP_START } from '@/store/user/user.reducer';
import { selectCurrentUser, selectUserError } from '@/src/store/user/user.selector';
import Spinner from './Spinner';

const defaultFormFields = {
  displayName: '',
  email: '',
  password: '',
  confirmPassword: '',
};

const SignUpForm = () => {
  const dispatch = useDispatch();
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { displayName, email, password, confirmPassword } = formFields;
  const [isLoading, setIsLoading] = useState(false);

  const currUser = useSelector(selectCurrentUser);
  const err = useSelector(selectUserError);

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };

  const handleSubmit: FormEventHandler<HTMLFormElement> = (event) => {
    const handler = async () => {
      event.preventDefault();

      if (password !== confirmPassword) {
        alert('Passwords unmatch!');
        resetFormFields();
        return;
      }
      try {
        dispatch(SIGN_UP_START({ email, password, displayName }));
        setIsLoading(true);
        resetFormFields();
      } catch (error: unknown) {
        dispatch(SIGN_UP_FAILED(error));
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
    if ( currUser || err ) setIsLoading(false);
  }, [currUser, err]);

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
