import { MouseEventHandler, useRef, useEffect } from 'react';
import Image from 'next/image';
import { useQuery } from '@apollo/client';
import { useCookies } from 'react-cookie';
import { useAtom } from 'jotai';

import { graphql } from '@/src/gql';
import ShoppingBag from '@/assets/icons-and-logos/icon-shopping-bag.svg'
import ClientOnly from './ClientOnly';
import { cartOpenAtom } from 'pages/_app';

export const GET_SUMOFITEM = graphql(`
  query GetSumOfItems($uid: String!) {
    sumOfItems(uid: $uid)
  }
`)
const CartIcon = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [isCartOpen, setIsCartOpen] = useAtom(cartOpenAtom);

  const toggleDropDown: MouseEventHandler<HTMLDivElement> = (e) => {
    e.stopPropagation();
    setIsCartOpen(!isCartOpen);
  };

  const [ cookies ] = useCookies();
  const {loading, error, data} = useQuery(GET_SUMOFITEM, {
    variables: {
      uid: cookies.user
    },
    skip: !cookies.user,
  });

  const handleClickOutside = (event: MouseEvent): void => {
    const tgt = event.target as Element;
    if (tgt.id == 'checkOutBtn') return;
    if (!ref.current?.contains(event.target as Node)) {
      setIsCartOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutside, true);
    return () => {
      document.removeEventListener('click', handleClickOutside, true);
    };
  }, []);

  return (
    <div
      ref={ref}
      onClick={toggleDropDown}
      onKeyDown={ e => e.key === "Enter" && setIsCartOpen(!isCartOpen)}
      className="relative flex h-full w-11 cursor-pointer items-center justify-center"
      tabIndex={0}
    >
      <Image src={ShoppingBag} className="h-6 w-6" alt='shopping-bag'/>
      <ClientOnly>
        <span className="absolute text-xs font-bold">
          { cookies['user']
              ? loading
                ? ''
                : data?.sumOfItems ?? '0'
              : '0'
          }
        </span>
      </ClientOnly>
    </div>
  )
}

export default CartIcon;