import * as React from 'react';
import FormInput from '../FormInput/form-input.component';
import {
  EMAIL_SIGN_IN_START,
  GOOGLE_SIGN_IN_START,
  SIGN_IN_FAILED,
} from '../../store/user/user.reducer';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../types';

const defaultFormFields = {
  email: '',
  password: '',
};

const SignInForm: React.FC = () => {
  const dispatch = useDispatch();
  // const dispatch: AppDispatch = useDispatch();
  const [formFields, setFormFields] = React.useState(defaultFormFields);
  const { email, password } = formFields;

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };

  const signInWithGoogle = () => {
    dispatch(GOOGLE_SIGN_IN_START());
  };

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (event) => {
    const handler = async () => {
      event.preventDefault();

      try {
        dispatch(EMAIL_SIGN_IN_START({ email, password }));
        resetFormFields();
      } catch (error: unknown) {
        dispatch(SIGN_IN_FAILED(error));
        resetFormFields();
      }
    };

    handler().catch(Error);
  };

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value });
  };
  return (
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
          <button onClick={signInWithGoogle} className="daisy-btn-secondary px-8 py-4 uppercase">
            sign in with google
          </button>
          {/* <Button type="submit" buttonType="default">
            sign in
          </Button>
          <div className="h-1.5 xs:hidden"></div>
            <Button clickHandler={signInWithGoogle} type="button" buttonType="google">
            sign in with google
          </Button> */}
        </div>
      </form>
    </div>
  );
};

export default SignInForm;
