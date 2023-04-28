import clsx from 'clsx';
import Image from 'next/image';
import FB from '@/assets/icons-and-logos/facebook.svg';
import IG from '@/assets/icons-and-logos/instagram.svg';
import Github from '@/assets/icons-and-logos/github.svg';
import TW from '@/assets/icons-and-logos/twitter.svg';

const iconStyle = clsx('mr-3 h-10 w-10');

type FooterProp = {
  isFixed?: boolean;
};

const Footer = ({ isFixed }: FooterProp) => {
  return (
    <footer
      className={`${
        isFixed ? 'fixed bottom-0 left-0 right-0' : ''
      } bg-base-200 py-4 xs:py-6 md:py-8`}
    >
      <section className="mx-2 justify-between xs:flex sm:mx-5 md:container md:mx-6 xl:mx-auto">
        <div className="flex items-center xs:shrink sm:w-1/2 md:w-1/3 md:justify-between lg:w-1/4">
          <Image src={FB} className={iconStyle} alt='facebook'/>
          <Image src={IG} className={iconStyle} alt='instagram'/>
          <Image src={Github} className={iconStyle} alt='github'/>
          <Image src={TW} className={iconStyle} alt='twitter'/>
        </div>
        <div className="flex items-center pt-4 text-sm xs:w-1/2 xs:pt-0 md:text-lg">
          *For personal practice only, not for commercial use
        </div>
      </section>
    </footer>
  )
}

export default Footer;