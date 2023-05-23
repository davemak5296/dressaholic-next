import { Dispatch, SetStateAction, ChangeEventHandler } from 'react';
import validator from 'validator';

type PriceFilterProps = {
  min: number | string;
  max: number | string;
  setMin: Dispatch<SetStateAction<number>>;
  setMax: Dispatch<SetStateAction<number>>;
};

const PriceFilter = ({ min, max, setMin, setMax }: PriceFilterProps) => {
  const changeHandler: ChangeEventHandler = (e) => {
    const tgt = e.target as HTMLInputElement;

    if (validator.isNumeric(tgt.value)) {
      tgt.id == 'min-price' ? setMin(parseInt(tgt.value)) : setMax(parseInt(tgt.value));
    } else if (tgt.value == '') {
      tgt.id == 'min-price' ? setMin(0) : setMax(0);
    }
  };

  return (
    <div
      className="daisy-collapse-arrow daisy-collapse border-b border-base-300 bg-base-100"
      onKeyDown={ e => { if (e.key === 'Tab') {
        let input = document.getElementById('price-filter-toggle') as HTMLInputElement;
        input.checked = true;
      }}}
      tabIndex={0}
    >
      <input id="price-filter-toggle" type="checkbox" />
      <div className="daisy-collapse-title text-base">Price</div>
      <div className="daisy-collapse-content text-sm font-light">
        <div className="flex w-1/2 items-center justify-evenly sm:block sm:w-full lg:flex">
          $&nbsp;
          <input
            id="min-price"
            onChange={changeHandler}
            className="w-10 border border-solid border-base-300 text-center outline-none"
            type="text"
            value={min}
          />
          <span>
            <span className="lg:hidden">&nbsp;&nbsp;</span>to
          </span>
          <br className="lg:hidden" />
          &nbsp;$&nbsp;
          <input
            id="max-price"
            onChange={changeHandler}
            className="w-10 border border-solid border-base-300 text-center outline-none sm:mt-1 lg:mt-0"
            type="text"
            value={max}
          />
        </div>
        <br />
        <div
          className="cursor-pointer text-blue-500 underline"
          onClick={() => {
            setMin(0);
            setMax(0);
          }}
          onKeyDown={ e => {
            if (e.key === 'Enter') {
              setMin(0);
              setMax(0);
            }
          }}
          tabIndex={0}
        >
          clear
        </div>
      </div>
    </div>
  );
};

export default PriceFilter;
