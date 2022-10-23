import menActivewearProducts from './men-activewear';
import menShirtsProducts from './men-shirts';
import menOutwearProducts from './men-outwear';
import menJeansProducts from './men-jeans';
import womenActivewearProducts from './women-activewear';
import womenTopsProducts from './women-tops';
import womenDressesProducts from './women-dresses';
import womenJeansProducts from './women-jeans';
import { Catalog } from '../types';

export const menActivewearCatalog: Catalog = {
  mainCat: 'Men',
  subCat: 'men-activewear',
  items: menActivewearProducts,
};

export const menShirtsCatalog: Catalog = {
  mainCat: 'Men',
  subCat: 'men-shirts',
  items: menShirtsProducts,
};

export const menOutwearCatalog: Catalog = {
  mainCat: 'Men',
  subCat: 'men-outwear',
  items: menOutwearProducts,
};

export const menJeansCatalog: Catalog = {
  mainCat: 'Men',
  subCat: 'men-jeans',
  items: menJeansProducts,
};

export const womenActivewearCatalog: Catalog = {
  mainCat: 'Women',
  subCat: 'women-activewear',
  items: womenActivewearProducts,
};

export const womenTopsCatalog: Catalog = {
  mainCat: 'Women',
  subCat: 'women-tops',
  items: womenTopsProducts,
};

export const womenDressesCatalog: Catalog = {
  mainCat: 'Women',
  subCat: 'women-dresses',
  items: womenDressesProducts,
};

export const womenJeansCatalog: Catalog = {
  mainCat: 'Women',
  subCat: 'women-jeans',
  items: womenJeansProducts,
};

export const catalogs: Catalog[] = [
  menActivewearCatalog,
  menJeansCatalog,
  menShirtsCatalog,
  menOutwearCatalog,
  womenActivewearCatalog,
  womenJeansCatalog,
  womenDressesCatalog,
  womenTopsCatalog,
];
