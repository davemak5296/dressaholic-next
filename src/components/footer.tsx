import * as React from 'react';
import clsx from 'clsx';
import { ReactComponent as FB } from '../assets/facebook.svg';
import { ReactComponent as IG } from '../assets/instagram.svg';
import { ReactComponent as Github } from '../assets/github.svg';
import { ReactComponent as TW } from '../assets/twitter.svg';

const iconStyle = clsx('mr-3 h-10 w-10');

const Footer: React.FC = () => {
  return (
    <footer className="bg-base-200 py-4 xs:py-6 md:py-10">
      <section className="mx-auto justify-between xs:flex md:container">
        <div className="flex items-center xs:shrink sm:w-1/2 md:w-1/3 md:justify-between">
          <FB className={iconStyle} />
          <IG className={iconStyle} />
          <Github className={iconStyle} />
          <TW className={iconStyle} />
        </div>
        <div className="flex items-center pt-4 text-sm xs:w-1/2 xs:pt-0 md:text-lg">
          *For personal practice only, not for commercial use
        </div>
      </section>
    </footer>
  );
};

export default Footer;
