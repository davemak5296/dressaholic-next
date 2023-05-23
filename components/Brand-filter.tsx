import { MouseEventHandler, KeyboardEventHandler, Dispatch, SetStateAction } from 'react';

type BrandFilterProps = {
  brandDedup: string[];
  setChosenBrands: Dispatch<SetStateAction<string[]>>;
};

const BrandFilter = ({ brandDedup, setChosenBrands }: BrandFilterProps) => {
  const toggleBrand = (e: MouseEvent | KeyboardEvent) => {
    let target = e.target as HTMLInputElement;
    if (e.nativeEvent instanceof KeyboardEvent) {target.checked = !target.checked} 
    target.checked
      ? setChosenBrands((prev) => prev.concat([target.value]))
      : setChosenBrands((prev) => prev.filter((el) => el !== target.value));
  }
  const clearFilter = () => {
    setChosenBrands([] as string[]);
    brandDedup.forEach((el) => {
      const input = document.getElementById(el) as HTMLInputElement;
      input.checked = false;
    });
  }

  return (
    <div
      className="daisy-collapse-arrow daisy-collapse border-b border-base-300 bg-base-100"
      onKeyDown={ e => { if (e.key === 'Tab') {
        let input = document.getElementById('brand-filter-toggle') as HTMLInputElement;
        input.checked = true;
      }}}
      tabIndex={0}
    >
      <input id="brand-filter-toggle" type="checkbox"/>
      <div className="daisy-collapse-title min-h-8 text-base">Brand</div>
      <div className="daisy-collapse-content text-sm font-light">
        <div className="flex flex-wrap justify-start">
          {brandDedup.map((el, i) => (
            <div key={i} className="w-1/3 sm:w-full xl:w-[45%] xl:pr-2">
              <input
                onClick={e => toggleBrand(e)}
                onKeyDown={e => { if(e.key === 'Enter') toggleBrand(e) } }
                type="checkbox" id={el} value={el} aria-label={`check to include or exclude products under ${el} brand`}/>
              <label htmlFor={el}>&nbsp;{el}</label>
            </div>
          ))}
        </div>
        <br />
        <div
          className="cursor-pointer text-blue-500 underline"
          onClick={() => clearFilter()}
          onKeyDown={ e => { if(e.key === 'Enter') clearFilter() } }
          role="button"
          aria-label="click to clear the brand filter"
          tabIndex={0}
        >
          clear
        </div>
      </div>
    </div>
  );
};

export default BrandFilter;
