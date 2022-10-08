export interface BaseCategoryType {
  id: number;
  name: string;
  sub_categories: SubCategoryType | SubCategoryType[];
}

export interface SubCategoryType {
  id: number;
  name: string;
  master: BaseCategoryType;
}
