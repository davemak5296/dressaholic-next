import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useCookies } from 'react-cookie';
import CartIcon from './Cart-icon'
import CartDropDown from './Cart-dropdown'
import Logo from '@/assets/icons-and-logos/letter-d.svg'
import ShopIcon from '@/assets/icons-and-logos/icon-shop.svg'
import LoginIcon from '@/assets/icons-and-logos/icon-login.svg'
import LogoutIcon from '@/assets/icons-and-logos/icon-logout.svg'
import { useAtom } from 'jotai';
import { cartOpenAtom } from 'pages/_app';

type NavBarProps = {
  scrollY: number;
  isAuth: boolean;
};

const iconStyle = 'mr-3 h-[25px] w-[25px] cursor-pointer md:hidden';

const NavBar = ({ scrollY, isAuth }: NavBarProps) => {
  const [isCartOpen] = useAtom(cartOpenAtom);
  const [ cookie, setCookies ] = useCookies();
  const router = useRouter();
  const isScrolledOver = scrollY > 36;

  const signOutHandler: React.MouseEventHandler = () => {
    setCookies('user', '', {
      path: '/',
      maxAge: -1
    });
    router.reload();
  };

  return (
    <div className="relative z-20">
      <nav
        className={`${
          isScrolledOver ? 'h-auto' : 'h-auto'
        } fixed left-0 top-0 right-0 flex justify-between bg-base-200`}
      >
        <section className="flex w-1/2 items-center justify-start p-2 sm:ml-3 lg:p-3 xl:ml-5">
          <Link href="/">
            <Image
              src={Logo}
              className={`${
                isScrolledOver ? 'hidden' : ''
              } h-[30px] w-[30px] sm:h-[48px] sm:w-[48px]`} alt='logo'
            />
          </Link>
          <div
            className={`${
              isScrolledOver
                ? 'text-sm lg:text-lg'
                : 'p-1 text-lg sm:pl-3 sm:text-2xl lg:text-[28px]'
            } font-bold text-primary`}
          >
            <Link href="/">Dressaholic</Link>
          </div>
        </section>
        <section
          className={`${
            isScrolledOver ? 'hidden' : 'flex'
          } w-2/5 items-center justify-around xl:w-1/3`}
        >
          <div className="daisy-dropdown-hover daisy-dropdown">
            <label
              tabIndex={0}
              className="daisy-rounded-btn daisy-btn daisy-btn-ghost hidden text-base text-primary hover:daisy-btn-primary md:inline-flex"
            >
              Shop
            </label>
            <Image src={ShopIcon} className={iconStyle} alt='shop-icon'/>
            {/* </Link> */}
            <div className="daisy-dropdown-content daisy-menu">
              <ul tabIndex={0} className="rounded-box mt-4 w-52 bg-base-100 p-2 shadow">
                <li>
                  <Link href="/shop/men">Men</Link>
                </li>
                <li>
                  <Link href="/shop/women">Women</Link>
                </li>
              </ul>
            </div>
          </div>
          {/* <SignInButton /> */}
          {isAuth ? (
            <>
              <button
                onClick={signOutHandler}
                className="daisy-rounded-btn daisy-btn daisy-btn-ghost hidden text-base text-warning-content hover:daisy-btn-warning hover:text-warning-content md:inline-flex"
              >
                sign out
              </button>
              <Image src={LogoutIcon} onClick={signOutHandler} className={iconStyle} alt='logout-icon'/>
            </>
          ) : (
            <>
              <Link
                href="/auth"
                className="daisy-rounded-btn daisy-btn daisy-btn-ghost hidden text-base text-info-content hover:daisy-btn-info hover:text-info-content md:inline-flex"
              >
                sign in
              </Link>
              <Image src={LoginIcon} onClick={() => router.push('/auth')} className={iconStyle} alt='login-icon'/>
            </>
          )}
          <CartIcon />
          {isCartOpen && <CartDropDown />}
        </section>
      </nav>
    </div>

  )
}

export default NavBar;