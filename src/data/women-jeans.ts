import { Product } from '../types';

const womenJeans: Product[] = [
  {
    sku: 'F-JE-001',
    displayName: 'Boyfriend Jean',
    brand: 'Leni',
    price: 239,
    colors: ['blue'],
    stocks: {
      blue: {
        sm: 2,
        md: 3,
        lg: 12,
        xl: 4,
      },
    },
    imageUrls: {
      blue: {
        thumbnail: 'https://i.ibb.co/hWYQFpK/F-JE-001-blue-thumb.jpg',
        one: 'https://i.ibb.co/XpgN818/F-JE-001-blue-one.jpg',
        two: 'https://i.ibb.co/7WqY9pt/F-JE-001-blue-two.jpg',
      },
    },
  },
  {
    sku: 'F-JE-002',
    displayName: 'Pull-On Pant with Pockets',
    brand: 'Hilary',
    price: 250,
    colors: ['cream', 'black'],
    stocks: {
      cream: {
        sm: 1,
        md: 0,
        lg: 4,
        xl: 2,
      },
      black: {
        sm: 1,
        md: 0,
        lg: 2,
        xl: 0,
      },
    },
    imageUrls: {
      cream: {
        thumbnail: 'https://i.ibb.co/hgLHx80/F-JE-002-cream-thumb.jpg',
        one: 'https://i.ibb.co/NsRhjfZ/F-JE-002-cream-one.jpg',
        two: 'https://i.ibb.co/X5FSFw3/F-JE-002-cream-two.jpg',
      },
      black: {
        thumbnail: 'https://i.ibb.co/bQSrTTx/F-JE-002-black-thumb.jpg',
        one: 'https://i.ibb.co/zbgQ2Kp/F-JE-002-black-one.jpg',
        two: 'https://i.ibb.co/8Xm7DFf/F-JE-002-black-two.jpg',
      },
    },
  },
  {
    sku: 'F-JE-003',
    displayName: 'Fleece Lined Pant',
    brand: 'Virx',
    price: 340,
    colors: ['purple', 'blue'],
    stocks: {
      purple: {
        sm: 1,
        md: 0,
        lg: 5,
        xl: 8,
      },
      blue: {
        sm: 3,
        md: 12,
        lg: 5,
        xl: 2,
      },
    },
    imageUrls: {
      purple: {
        thumbnail: 'https://i.ibb.co/Z8SjQWF/F-JE-003-purple-thumb.jpg',
        one: 'https://i.ibb.co/Hq1yt2N/F-JE-003-purple-one.jpg',
        two: 'https://i.ibb.co/SJb60th/F-JE-003-purple-two.jpg',
      },
      blue: {
        thumbnail: 'https://i.ibb.co/NSk48tM/F-JE-003-blue-thumb.jpg',
        one: 'https://i.ibb.co/nQZ6Hk2/F-JE-003-blue-one.jpg',
        two: 'https://i.ibb.co/BZ8tdYY/F-JE-003-blue-two.jpg',
      },
    },
  },
  {
    sku: 'F-JE-004',
    displayName: 'Ab Solution Jegging',
    brand: 'Leni',
    price: 299,
    colors: ['blue'],
    stocks: {
      blue: {
        sm: 1,
        md: 0,
        lg: 2,
        xl: 3,
      },
    },
    imageUrls: {
      blue: {
        thumbnail: 'https://i.ibb.co/1Jy1cR1/F-JE-004-blue-thumb.jpg',
        one: 'https://i.ibb.co/Z6Jc1c2/F-JE-004-blue-one.jpg',
        two: 'https://i.ibb.co/3pn1XvT/F-JE-004-blue-two.jpg',
      },
    },
  },
  {
    sku: 'F-JE-005',
    displayName: 'SKINNY HIGH RISE JEANS',
    brand: 'Virx',
    price: 210,
    colors: ['blue'],
    stocks: {
      blue: {
        sm: 1,
        md: 5,
        lg: 2,
        xl: 0,
      },
    },
    imageUrls: {
      blue: {
        thumbnail: 'https://i.ibb.co/6Bq8F9W/F-JE-005-blue-thumb.jpg',
        one: 'https://i.ibb.co/R4qgZ8L/F-JE-005-blue-one.jpg',
        two: 'https://i.ibb.co/Kz1P366/F-JE-005-blue-two.jpg',
      },
    },
  },
];

export default womenJeans;
