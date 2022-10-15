import * as React from 'react';
import SignInForm from '../components/SignInForm/sign-in-form.component';
import SignUpForm from '../components/SignUpForm/sign-up-form.components';

const Authentication: React.FC = () => {
  return (
    <main className="main-container flex w-full flex-col items-center py-4 lg:h-[calc(100vh-180px)] lg:w-[850px] lg:flex-row lg:items-start lg:justify-between">
      <SignInForm />
      <SignUpForm />
    </main>
  );
};

export default Authentication;
