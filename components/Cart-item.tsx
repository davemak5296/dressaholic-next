import { CartItemType } from '@/src/types';
import AddButton from './Add-button';
import MinusButton from './Minus-button';
import DeleteButton from './Delete-button';

// this component is used by /cart and /place-order route
// when used in /cart, "orderPage" Props is omitted, so Minus, Plus or Cross icon will be rendered
// when used in /place-order, "orderPage" Props is set to "true", so Minus, Plus or Cross icon will be not rendered. 
type CartItemProp = {
  item: CartItemType;
  orderPage?: boolean;
  uid: string
};

const CartItem = ({ item, orderPage, uid }: CartItemProp) => {
  const { displayName, price, qty, size, color, imageUrl } = item;

  return (
    <>
      {/* cart item - when smaller than sm */}
      {!orderPage && (
        <section className="h-[80px] grid grid-cols-cart-below-sm grid-rows-2 text-xs xs:text-sm sm:hidden">
          <img className="max-h-[80px] mx-auto col-span-1 col-start-1 row-span-2 row-start-1 flex justify-center p-2" src={imageUrl} alt="" />
          <div className="col-span-3 col-start-2 row-span-1 row-start-1 p-2 xs:pt-4">
            {displayName}
            <div className="text-xs">&nbsp;&nbsp;color: {color} </div>
            <div className="text-xs">&nbsp;&nbsp;size: {size} </div>
          </div>
          <div className="col-span-1 col-start-3 row-span-1 row-start-1 flex justify-center self-center">
            {price}
          </div>
          <div className="col-span-1 col-start-3 row-span-1 row-start-2 flex justify-center self-start">
            <MinusButton uid={uid} item={item}/>
            <div>{qty}</div>
            <AddButton uid={uid} item={item} />
          </div>
          <div className="col-span-1 col-start-4 row-span-2 row-start-1 flex justify-center font-bold self-center">
            {`${qty * price}`}
          </div>
        </section>
      )}
      {/* cart item - when larger than sm */}
      <section
        className={`${
          orderPage
            ? 'max-h-[80px] grid grid-cols-cartXL-order text-xs lg:text-sm xl:text-base'
            : 'max-h-[130px] hidden grid-cols-cartXL text-sm sm:grid lg:text-base xl:text-lg'
        } items-center`}
      >
        <img className={`${orderPage?'max-h-[80px]':'max-h-[130px]'} mx-auto p-2`} src={imageUrl} alt="" />
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
          {!orderPage && <MinusButton uid={uid} item={item}/> }
          <div className={orderPage ? 'text-sm' : 'text-base'}>&nbsp;{qty}&nbsp;</div>
          {!orderPage && <AddButton uid={uid} item={item} /> }
        </div>
        <div className={orderPage ? 'text-sm' : 'text-base'}>{`${qty * price}`}</div>
        {!orderPage && ( <DeleteButton uid={uid} item={item} />)}
      </section>
      <hr />
    </>
  );
};

export default CartItem;
