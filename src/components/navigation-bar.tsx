import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { SIGN_OUT_START } from '../store/user/user.reducer';
import { selectCurrentUser } from '../store/user/user.selector';
import { Link, useNavigate } from 'react-router-dom';
import { ReactComponent as Logo } from '../assets/letter-d.svg';
import { ReactComponent as ShopIcon } from '../assets/icon-shop.svg';
import { ReactComponent as LoginIcon } from '../assets/icon-login.svg';
import { ReactComponent as LogoutIcon } from '../assets/icon-logout.svg';
import CartDropDown from './cart-dropdown.component';
import { selectIsCartOpen } from '../store/cart/cart.selector';
import CartIcon from './cart-icon.component';

type NavBarProps = {
  scrollY: number;
};

const iconStyle = 'mr-3 h-[25px] w-[25px] cursor-pointer md:hidden';

const Navigation: React.FC<NavBarProps> = (props) => {
  const dispatch = useDispatch();
  const currUser = useSelector(selectCurrentUser);
  const isCartOpen = useSelector(selectIsCartOpen);
  const navigate = useNavigate();
  const { scrollY } = props;
  const isScrolledOver = scrollY > 36;

  const signOutHandler: React.MouseEventHandler = () => {
    dispatch(SIGN_OUT_START());
  };

  return (
    <div className="relative z-20">
      <nav
        className={`${
          isScrolledOver ? 'h-auto' : 'h-auto'
        } fixed left-0 top-0 right-0 flex justify-between bg-base-200`}
      >
        <section className="flex w-1/2 items-center justify-start p-2 sm:ml-3 lg:p-3 xl:ml-5">
          <Link to="/">
            <Logo
              className={`${
                isScrolledOver ? 'hidden' : ''
              } h-[30px] w-[30px] sm:h-[48px] sm:w-[48px]`}
            />
          </Link>
          <div
            className={`${
              isScrolledOver
                ? 'text-sm lg:text-lg'
                : 'p-1 text-lg sm:pl-3 sm:text-2xl lg:text-[28px]'
            } font-bold text-primary`}
          >
            <Link to="/">Dressaholic</Link>
          </div>
        </section>
        <section
          className={`${
            isScrolledOver ? 'hidden' : 'flex'
          } w-2/5 items-center justify-around xl:w-1/3`}
        >
          <div className="daisy-dropdown-hover daisy-dropdown">
            {/* <Link to="/shop"> */}
            <label
              tabIndex={0}
              className="daisy-rounded-btn daisy-btn daisy-btn-ghost hidden text-base text-primary hover:daisy-btn-primary md:inline-flex"
            >
              Shop
            </label>
            <ShopIcon className={iconStyle} />
            {/* </Link> */}
            <div className="daisy-dropdown-content daisy-menu">
              <ul tabIndex={0} className="rounded-box mt-4 w-52 bg-base-100 p-2 shadow">
                <li>
                  <Link to="/shop/men">Men</Link>
                </li>
                <li>
                  <Link to="/shop/women">Women</Link>
                </li>
              </ul>
            </div>
          </div>
          {currUser ? (
            <>
              <button
                onClick={signOutHandler}
                className="daisy-rounded-btn daisy-btn daisy-btn-ghost hidden text-base text-warning-content hover:daisy-btn-warning hover:text-warning-content md:inline-flex"
              >
                sign out
              </button>
              <LogoutIcon onClick={signOutHandler} className={iconStyle} />
            </>
          ) : (
            <>
              <Link
                to="/auth"
                className="daisy-rounded-btn daisy-btn daisy-btn-ghost hidden text-base text-info-content hover:daisy-btn-info hover:text-info-content md:inline-flex"
              >
                sign in
              </Link>
              <LoginIcon onClick={() => navigate('/auth')} className={iconStyle} />
            </>
          )}
          <CartIcon />
          {isCartOpen && <CartDropDown />}
        </section>
      </nav>
    </div>
  );
};

export default Navigation;
