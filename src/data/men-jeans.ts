import { Product } from '../types';

const menJeans: Product[] = [
  {
    sku: 'M-JE-001',
    displayName: 'Non Iron Pant',
    brand: 'Haggar',
    price: 159,
    colors: ['tan', 'black'],
    stocks: {
      tan: {
        sm: 2,
        md: 10,
        lg: 13,
        xl: 4,
      },
      black: {
        sm: 20,
        md: 3,
        lg: 9,
        xl: 0,
      },
    },
    imageUrls: {
      tan: {
        thumbnail: 'https://i.ibb.co/yfHjDFL/M-JE-001-tan-thumbnail.jpg',
        one: 'https://i.ibb.co/Nj396GJ/M-JE-001-tan-one.jpg',
        two: 'https://i.ibb.co/Drk4znN/M-JE-001-tan-two.jpg',
      },
      black: {
        thumbnail: 'https://i.ibb.co/TBh8fTT/M-JE-001-black-thumbnail.jpg',
        one: 'https://i.ibb.co/mNfK6T5/M-JE-001-black-one.jpg',
        two: 'https://i.ibb.co/M2SJSK5/M-JE-001-black-two.jpg',
      },
    },
  },
  {
    sku: 'M-JE-002',
    displayName: 'Signature Jean',
    brand: 'Karklander',
    price: 259,
    colors: ['blue'],
    stocks: {
      blue: {
        sm: 9,
        md: 19,
        lg: 2,
        xl: 1,
      },
    },
    imageUrls: {
      blue: {
        thumbnail: 'https://i.ibb.co/YXr2T6K/M-JE-002-blue-thumbnail.webp',
        one: 'https://i.ibb.co/DwrN65w/M-JE-002-blue-one.jpg',
        two: 'https://i.ibb.co/RQ9PCwq/M-JE-002-blue-two.jpg',
      },
    },
  },
  {
    sku: 'M-JE-003',
    displayName: 'Republic Pocket Pant',
    brand: 'Onus',
    price: 170,
    colors: ['black', 'blue'],
    stocks: {
      black: {
        sm: 4,
        md: 24,
        lg: 9,
        xl: 0,
      },
      blue: {
        sm: 14,
        md: 3,
        lg: 9,
        xl: 5,
      },
    },
    imageUrls: {
      black: {
        thumbnail: 'https://i.ibb.co/CwKGqrr/M-JE-003-black-thumbnail.jpg',
        one: 'https://i.ibb.co/9g3Cv4F/M-JE-003-black-one.jpg',
        two: 'https://i.ibb.co/sj44H7V/M-JE-003-black-two.jpg',
      },
      blue: {
        thumbnail: 'https://i.ibb.co/8DPf8R3/M-JE-003-blue-thumbnail.jpg',
        one: 'https://i.ibb.co/TcNcF47/M-JE-003-blue-one.jpg',
        two: 'https://i.ibb.co/T0vSYfX/M-JE-003-blue-two.jpg',
      },
    },
  },
  {
    sku: 'M-JE-004',
    displayName: 'Classic-Fit Chino Pant',
    brand: 'Nautica',
    price: 229,
    colors: ['white'],
    stocks: {
      white: {
        sm: 2,
        md: 5,
        lg: 20,
        xl: 4,
      },
    },
    imageUrls: {
      white: {
        thumbnail: 'https://i.ibb.co/xGF39Hr/M-JE-004-white-thumb.jpg',
        one: 'https://i.ibb.co/yqWTt6d/M-JE-004-white-one.jpg',
        two: 'https://i.ibb.co/9mXw9HW/M-JE-004-white-two.jpg',
      },
    },
  },
  {
    sku: 'M-JE-005',
    displayName: 'ULTRA STRETCH FIT JEANS',
    brand: 'Onus',
    price: 239,
    colors: ['gray'],
    stocks: {
      gray: {
        sm: 4,
        md: 5,
        lg: 19,
        xl: 2,
      },
    },
    imageUrls: {
      gray: {
        thumbnail: 'https://i.ibb.co/jrjG9Kg/M-JE-005-gray-thumb.jpg',
        one: 'https://i.ibb.co/QF1c683/M-JE-005-gray-one.jpg',
        two: 'https://i.ibb.co/KVmksh5/M-JE-005-gray-two.jpg',
      },
    },
  },
];

export default menJeans;
