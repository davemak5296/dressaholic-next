import { MouseEventHandler} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Image from 'next/image';
import { CartItemType } from '@/src/types';
import MinusSign from '@/assets/icons-and-logos/circle-minus-solid.svg';
import PlusSign from '@/assets/icons-and-logos/circle-plus-solid.svg';
import CrossSign from '@/assets/icons-and-logos/circle-xmark-solid.svg';
import { selectCartItems } from '@/store/cart/cart.selector';
import { addItemToCart, clearItemInCart, subtractItemInCart } from '@/store/cart/cart.action';

// this component is used by /cart and /place-order route
// when used in /cart, "orderPage" Props is omitted, so Minus, Plus or Cross icon will be rendered
// when used in /place-order, "orderPage" Props is set to "true", so Minus, Plus or Cross icon will be not rendered. 
type CartItemProp = {
  item: CartItemType;
  orderPage?: boolean;
};

const CartItem = ({ item, orderPage }: CartItemProp) => {
  const { displayName, price, qty, size, color, imageUrl } = item;
  const dispatch = useDispatch();
  const itemsInCart = useSelector(selectCartItems);

  const addOne: MouseEventHandler<HTMLOrSVGElement> = (e) => {
    e.stopPropagation();
    dispatch(addItemToCart(itemsInCart, item, true));
  };

  const deductOne: MouseEventHandler<HTMLOrSVGElement> = (e) => {
    e.stopPropagation();
    dispatch(subtractItemInCart(itemsInCart, item));
  };

  const removeItem: MouseEventHandler<HTMLOrSVGElement> = (e) => {
    e.stopPropagation();
    dispatch(clearItemInCart(itemsInCart, item));
  };

  return (
    <>
      {/* cart item - when smaller than sm */}
      {!orderPage && (
        <section className="grid grid-cols-cart text-xs xs:text-sm sm:hidden">
          <div className="col-span-1 col-start-1 row-span-2 row-start-1 flex justify-center p-2">
            <img className="w-2/3" src={imageUrl} alt="" />
          </div>
          <div className="col-span-3 col-start-2 row-span-1 row-start-1 p-2 xs:pt-4">
            {displayName}
            <div className="text-xs">&nbsp;&nbsp;color: {color} </div>
            <div className="text-xs">&nbsp;&nbsp;size: {size} </div>
          </div>
          <div className="col-span-1 col-start-2 row-span-1 row-start-2 flex justify-center">
            {price}
          </div>
          <div className="col-span-1 col-start-3 row-span-1 row-start-2 flex justify-center">
            <Image src={MinusSign} onClick={deductOne} className="mr-1 h-4 w-4 cursor-pointer" alt='minus-sign' />
            <div>{qty}</div>
            <Image src={PlusSign} onClick={addOne} className="ml-1 h-4 w-4 cursor-pointer" alt='plus-sign' />
          </div>
          <div className="col-span-1 col-start-4 row-span-1 row-start-2 flex justify-center font-bold">
            {`${qty * price}`}
          </div>
        </section>
      )}
      {/* cart item - when larger than sm */}
      <section
        className={`${
          orderPage
            ? 'grid grid-cols-cartXL-order text-xs lg:text-sm xl:text-base'
            : 'hidden grid-cols-cartXL text-sm sm:grid lg:text-base xl:text-lg'
        } items-center`}
      >
        <div className="p-2">
          <img className={orderPage ? 'w-2/3 lg:w-full' : 'w-2/3'} src={imageUrl} alt="" />
        </div>
        {!orderPage && (
          <div className="w-4/5">
            {displayName}
            <div className="text-xs lg:text-sm xl:text-base">&nbsp;&nbsp;color: {color}</div>
            <div className="text-xs lg:text-sm xl:text-base">&nbsp;&nbsp;size: {size}</div>
          </div>
        )}
        {orderPage && (
          <div className="w-4/5 text-xs sm:text-base lg:text-sm">
            {displayName}&nbsp;[{color}, {size}]
          </div>
        )}
        <div className={orderPage ? 'text-sm' : 'text-base'}>{price}</div>
        <div className="flex items-center">
          {!orderPage && <Image src={MinusSign} onClick={deductOne} className="mr-1 h-4 w-4 cursor-pointer" alt='minus-sign'/>}
          <div className={orderPage ? 'text-sm' : 'text-base'}>&nbsp;{qty}&nbsp;</div>
          {!orderPage && <Image src={PlusSign} onClick={addOne} className="ml-1 h-4 w-4 cursor-pointer" alt='plus-sign' />}
        </div>
        <div className={orderPage ? 'text-sm' : 'text-base'}>{`${qty * price}`}</div>
        {!orderPage && (
          <Image src={CrossSign} onClick={removeItem} className="flex h-5 w-5 cursor-pointer justify-center" alt='cross-sign' />
        )}
      </section>
      <hr />
    </>
  );
};

export default CartItem;
