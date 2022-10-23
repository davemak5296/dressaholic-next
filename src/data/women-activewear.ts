import { Product } from '../types';

const womenActivewear: Product[] = [
  {
    sku: 'F-AC-001',
    displayName: 'Yoga Leggings',
    brand: 'Virx',
    price: 129,
    colors: ['grey'],
    stocks: {
      grey: {
        sm: 4,
        md: 9,
        lg: 0,
        xl: 2,
      },
    },
    imageUrls: {
      grey: {
        thumbnail: 'https://i.ibb.co/G5H9xn2/F-AC-001-grey-thumb.jpg',
        one: null,
        two: null,
      },
    },
  },
  {
    sku: 'F-AC-002',
    displayName: 'Slim Bottoms',
    brand: 'Leni',
    price: 399,
    colors: ['black'],
    stocks: {
      black: {
        sm: 3,
        md: 12,
        lg: 9,
        xl: 4,
      },
    },
    imageUrls: {
      black: {
        thumbnail: 'https://i.ibb.co/k28ZVCG/F-AC-002-black-thumb.jpg',
        one: 'https://i.ibb.co/gt0Yhwz/F-AC-002-black-one.jpg',
        two: 'https://i.ibb.co/vHw8YcJ/F-AC-002-black-two.jpg',
      },
    },
  },
  {
    sku: 'F-AC-003',
    displayName: 'UPF Hiking Shirts',
    brand: 'Virx',
    price: 229,
    colors: ['orange', 'skyblue'],
    stocks: {
      orange: {
        sm: 1,
        md: 6,
        lg: 5,
        xl: 4,
      },
      skyblue: {
        sm: 3,
        md: 0,
        lg: 2,
        xl: 0,
      },
    },
    imageUrls: {
      orange: {
        thumbnail: 'https://i.ibb.co/sCwq5XG/F-AC-003-orange-thumb.jpg',
        one: 'https://i.ibb.co/wJqnm2r/F-AC-003-orange-one.jpg',
        two: 'https://i.ibb.co/Q64BST2/F-AC-003-orange-two.jpg',
      },
      skyblue: {
        thumbnail: 'https://i.ibb.co/khHTD3c/F-AC-003-skyblue-thumb.jpg',
        one: 'https://i.ibb.co/7YXCnPX/F-AC-003-skyblue-one.jpg',
        two: 'https://i.ibb.co/qpwML8V/F-AC-003-skyblue-two.jpg',
      },
    },
  },
  {
    sku: 'F-AC-004',
    displayName: 'Quick Dry Athletic Tops',
    brand: 'Leni',
    price: 239,
    colors: ['white', 'black'],
    stocks: {
      white: {
        sm: 2,
        md: 5,
        lg: 7,
        xl: 0,
      },
      black: {
        sm: 6,
        md: 12,
        lg: 5,
        xl: 3,
      },
    },
    imageUrls: {
      white: {
        thumbnail: 'https://i.ibb.co/M5cJvYD/F-AC-004-black-thumb.jpg',
        one: 'https://i.ibb.co/g3ShywN/F-AC-004-black-one.jpg',
        two: null,
      },
      black: {
        thumbnail: 'https://i.ibb.co/M5cJvYD/F-AC-004-black-thumb.jpg',
        one: null,
        two: null,
      },
    },
  },
  {
    sku: 'F-AC-005',
    displayName: 'ACTIVE JOGGER PANTS',
    brand: 'Virx',
    price: 149,
    colors: ['blue'],
    stocks: {
      blue: {
        sm: 1,
        md: 5,
        lg: 9,
        xl: 0,
      },
    },
    imageUrls: {
      blue: {
        thumbnail: 'https://i.ibb.co/JRwz5Jn/F-AC-005-blue-thumb.jpg',
        one: null,
        two: null,
      },
    },
  },
];

export default womenActivewear;
