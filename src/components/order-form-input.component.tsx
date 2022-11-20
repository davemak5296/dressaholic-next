import * as React from 'react';
import { Updater } from 'use-immer';
import validator from 'validator';
import _ from 'lodash';
import { InputValType } from '../pages/order-page';

type OrderFormInputProps = {
  width: 'full' | 'half';
  id: string;
  name: string;
  value: string;
  setValue: Updater<InputValType>;
  valid?: boolean;
  isTextType: boolean;
  required?: boolean;
  children?: React.ReactNode;
};

const OrderFormInput: React.FC<OrderFormInputProps> = ({
  width,
  children,
  id,
  name,
  value,
  valid,
  setValue,
  isTextType,
  required,
}) => {
  const focusOutHandler: React.FocusEventHandler<HTMLInputElement> = (e) => {
    const len = e.target.value.length;
    setValue((draft) => {
      if (id == 'contact')
        draft['contactValid'] = validator.isMobilePhone(e.target.value, ['zh-HK']);
      if (id == 'email') draft['emailValid'] = validator.isEmail(e.target.value);
      if (id == 'name') draft['nameValid'] = len !== 0;
      if (id == 'address') draft['addressValid'] = len !== 0;
    });
  };

  return (
    <div className={`${width == 'half' ? 'w-[45%]' : 'w-full'} mt-3 flex flex-col`}>
      <label htmlFor={`ship-${id}`} className="pb-[1px] capitalize">
        {name}:
      </label>
      {isTextType && (
        <input
          onBlur={focusOutHandler}
          onChange={(e) =>
            setValue((draft) => {
              _.set(draft, id, e.target.value);
            })
          }
          id={`ship-${id}`}
          className="border border-solid border-base-300 p-1 pl-2 text-sm font-light"
          type="text"
          placeholder={`Please enter recipient's ${name}:`}
          value={value}
          required={required}
        />
      )}
      {children}
      {required && !valid && (
        <label className="text-xs font-light text-red-500">please enter correct {name}</label>
      )}
    </div>
  );
};
export default OrderFormInput;
