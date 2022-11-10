import * as React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { selectCategoriesMap } from '../store/category/categories.selector';
import { Product, UseParamsCategoryType } from '../types';
import _ from 'lodash';

type FilterPanelProps = {
  title: string;
  activeBrands: string[];
  setChosenBrands: React.Dispatch<React.SetStateAction<string[]>>;
};

const FilterPanel: React.FC<FilterPanelProps> = ({ title, activeBrands, setChosenBrands }) => {
  const { category } = useParams<UseParamsCategoryType>() as UseParamsCategoryType;
  const categoriesMap = useSelector(selectCategoriesMap);
  const [uniBrands, setUniBrands] = React.useState<string[]>([] as string[]);

  React.useEffect(() => {
    if (Object.keys(categoriesMap).length == 0) return;
    const allBrands = categoriesMap[category].map((el) => el.brand);
    setUniBrands(_.union(allBrands));
  }, [categoriesMap, category]);

  const checkBoxHandler: React.MouseEventHandler = (e) => {
    const target = e.target as HTMLInputElement;
    target.checked
      ? setChosenBrands((prev) => prev.concat([target.value]))
      : setChosenBrands((prev) => prev.filter((el) => el !== target.value));
  };

  return (
    <div className="daisy-collapse-arrow daisy-collapse border-b border-base-300 bg-base-100">
      <input type="checkbox" />
      <div className="daisy-collapse-title text-base">{title}</div>
      <div className="daisy-collapse-content flex flex-wrap justify-start text-sm font-light">
        {uniBrands.map((el, index) => (
          <div key={index} className="w-[45%] pr-2">
            <input onClick={checkBoxHandler} type="checkbox" id={el} value={el} />
            <label htmlFor={el}>&nbsp;{el}</label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FilterPanel;
