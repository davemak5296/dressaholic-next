import { MouseEventHandler, Dispatch, SetStateAction } from 'react';

type BrandFilterProps = {
  brandDedup: string[];
  setChosenBrands: Dispatch<SetStateAction<string[]>>;
};

const BrandFilter = ({ brandDedup, setChosenBrands }: BrandFilterProps) => {
  const checkBoxHandler: MouseEventHandler = (e) => {
    const target = e.target as HTMLInputElement;
    target.checked
      ? setChosenBrands((prev) => prev.concat([target.value]))
      : setChosenBrands((prev) => prev.filter((el) => el !== target.value));
  };

  return (
    <div className="daisy-collapse-arrow daisy-collapse border-b border-base-300 bg-base-100">
      <input type="checkbox" />
      <div className="daisy-collapse-title min-h-8 text-base">Brand</div>
      <div className="daisy-collapse-content text-sm font-light">
        <div className="flex flex-wrap justify-start">
          {brandDedup.map((el, i) => (
            <div key={i} className="w-1/3 sm:w-full xl:w-[45%] xl:pr-2">
              <input onClick={checkBoxHandler} type="checkbox" id={el} value={el} aria-label={`check to include or exclude products under ${el} brand`}/>
              <label htmlFor={el}>&nbsp;{el}</label>
            </div>
          ))}
        </div>
        <br />
        <div
          className="cursor-pointer text-blue-500 underline"
          onClick={(e) => {
            setChosenBrands([] as string[]);
            brandDedup.forEach((el) => {
              const input = document.getElementById(el) as HTMLInputElement;
              input.checked = false;
            });
          }}
          role="button"
          aria-label="click to clear the brand filter"
        >
          clear
        </div>
      </div>
    </div>
  );
};

export default BrandFilter;
