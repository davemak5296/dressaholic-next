import { useState, useEffect, MouseEventHandler, Dispatch, SetStateAction } from 'react';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { selectCategoriesMap } from '@/store/category/categories.selector';
import { UseParamsCategoryType } from '@/src/types';
import _ from 'lodash';

type BrandFilterProps = {
  setChosenBrands: Dispatch<SetStateAction<string[]>>;
};

const BrandFilter = ({ setChosenBrands }: BrandFilterProps) => {
  const router = useRouter();
  const category = router.query?.category as string;
  const categoriesMap = useSelector(selectCategoriesMap);
  const [uniBrands, setUniBrands] = useState<string[]>([] as string[]);

  useEffect(() => {
    if (Object.keys(categoriesMap).length == 0) return;
    const allBrands = categoriesMap[category].map((el) => el.brand);
    setUniBrands(_.union(allBrands));
  }, [categoriesMap, category]);

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
          {uniBrands.map((el, i) => (
            <div key={i} className="w-1/3 sm:w-full xl:w-[45%] xl:pr-2">
              <input onClick={checkBoxHandler} type="checkbox" id={el} value={el} />
              <label htmlFor={el}>&nbsp;{el}</label>
            </div>
          ))}
        </div>
        <br />
        <div
          className="cursor-pointer text-blue-500 underline"
          onClick={(e) => {
            setChosenBrands([] as string[]);
            uniBrands.forEach((el) => {
              const input = document.getElementById(el) as HTMLInputElement;
              input.checked = false;
            });
          }}
        >
          clear
        </div>
      </div>
    </div>
  );
};

export default BrandFilter;
