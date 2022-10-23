import { Product } from '../types';

const menShirts: Product[] = [
  {
    sku: 'M-SH-001',
    displayName: 'Short Sleeve Woven Shirt',
    brand: 'Haggar',
    price: 99,
    colors: ['blue', 'green'],
    stocks: {
      blue: {
        sm: 9,
        md: 2,
        lg: 3,
        xl: 4,
      },
      green: {
        sm: 2,
        md: 5,
        lg: 9,
        xl: 6,
      },
    },
    imageUrls: {
      blue: {
        thumbnail: 'https://i.ibb.co/bXCTjty/M-SH-001-blue-thumbnail.jpg',
        one: 'https://i.ibb.co/6Hm659V/M-SH-001-blue-one.jpg',
        two: 'https://i.ibb.co/25dDxYp/M-SH-001-blue-two.jpg',
      },
      green: {
        thumbnail: 'https://i.ibb.co/C6Tm0wg/M-SH-001-green-thumbnail.jpg',
        one: 'https://i.ibb.co/V3k9DXF/M-SH-001-green-one.jpg',
        two: 'https://i.ibb.co/bRxH3MW/M-SH-001-green-two.jpg',
      },
    },
  },
  {
    sku: 'M-SH-002',
    displayName: 'Traditional Fit Dress Shirt',
    brand: 'Karlander',
    price: 210,
    colors: ['white'],
    stocks: {
      white: {
        sm: 3,
        md: 4,
        lg: 0,
        xl: 0,
      },
    },
    imageUrls: {
      white: {
        thumbnail: 'https://i.ibb.co/9pWR0fz/M-SH-002-white-thumbnail.webp',
        one: 'https://i.ibb.co/XLPGcB9/M-SH-002-white-one.jpg',
        two: 'https://i.ibb.co/q1JWqwY/M-SH-002-white-two.jpg',
      },
    },
  },
  {
    sku: 'M-SH-003',
    displayName: 'Long-Sleeve Plaid Poplin Shirt',
    brand: 'Hagger',
    price: 159,
    colors: ['blue'],
    stocks: {
      blue: {
        sm: 9,
        md: 4,
        lg: 5,
        xl: 1,
      },
    },
    imageUrls: {
      blue: {
        thumbnail: 'https://i.ibb.co/jrFz9WX/M-SH-003-blue-thumbnail.jpg',
        one: 'https://i.ibb.co/L9VbB3k/M-SH-003-blue-one.jpg',
        two: 'https://i.ibb.co/qC10Ndc/M-SH-003-blue-two.jpg',
      },
    },
  },
  {
    sku: 'M-SH-004',
    displayName: 'Traditional Fit Dress Shirt with Plaid',
    brand: 'Onue',
    price: 240,
    colors: ['blue'],
    stocks: {
      blue: {
        sm: 2,
        md: 0,
        lg: 0,
        xl: 1,
      },
    },
    imageUrls: {
      blue: {
        thumbnail: 'https://i.ibb.co/w4wVBvy/M-SH-004-blue-thumbnail.jpg',
        one: 'https://i.ibb.co/fkq8JDj/M-SH-004-blue-one.jpg',
        two: 'https://i.ibb.co/Xjb3Cdp/M-SH-004-blue-two.jpg',
      },
    },
  },
  {
    sku: 'M-SH-005',
    displayName: 'LONG SLEEVE SHIRT',
    brand: 'Ultra',
    price: 200,
    colors: ['blue', 'brown'],
    stocks: {
      blue: {
        sm: 2,
        md: 10,
        lg: 23,
        xl: 5,
      },
      brown: {
        sm: 9,
        md: 2,
        lg: 0,
        xl: 0,
      },
    },
    imageUrls: {
      blue: {
        thumbnail: 'https://i.ibb.co/4SQQpCC/M-SH-005-blue-thumbnail.jpg',
        one: 'https://i.ibb.co/DK9w97N/M-SH-005-blue-one.jpg',
        two: 'https://i.ibb.co/BzWJhyd/M-SH-005-blue-two.jpg',
      },
      brown: {
        thumbnail: 'https://i.ibb.co/hLD3B5B/M-SH-005-brown-thumbnail.jpg',
        one: 'https://i.ibb.co/3dbRX59/M-SH-005-brown-one.jpg',
        two: 'https://i.ibb.co/9gkLT7H/M-SH-005-brown-two.jpg',
      },
    },
  },
];
export default menShirts;
