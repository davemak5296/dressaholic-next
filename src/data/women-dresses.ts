import { Product } from '../types';

const womenDresses: Product[] = [
  {
    sku: 'F-DR-001',
    displayName: 'Denim Skort',
    brand: 'Haggar',
    price: 260,
    colors: ['blue', 'black'],
    stocks: {
      blue: {
        sm: 9,
        md: 13,
        lg: 5,
        xl: 4,
      },
      black: {
        sm: 3,
        md: 7,
        lg: 5,
        xl: 0,
      },
    },
    imageUrls: {
      blue: {
        thumbnail: 'https://i.ibb.co/C58vPnG/F-DR-001-blue-thumb.jpg',
        one: 'https://i.ibb.co/GM96N3V/F-DR-001-blue-one.jpg',
        two: 'https://i.ibb.co/sRSLxVg/F-DR-001-blue-two.jpg',
      },
      black: {
        thumbnail: 'https://i.ibb.co/vPddkpq/F-DR-001-black-thumb.jpg',
        one: 'https://i.ibb.co/w4MBgT2/F-DR-001-black-one.jpg',
        two: 'https://i.ibb.co/RbtVywP/F-DR-001-black-two.jpg',
      },
    },
  },
  {
    sku: 'F-DR-002',
    displayName: 'Short Sleeve Dress',
    brand: 'Hilary',
    price: 459,
    colors: ['blue', 'gray'],
    stocks: {
      blue: {
        sm: 1,
        md: 0,
        lg: 2,
        xl: 0,
      },
      gray: {
        sm: 4,
        md: 3,
        lg: 1,
        xl: 2,
      },
    },
    imageUrls: {
      blue: {
        thumbnail: 'https://i.ibb.co/wztC1Jm/F-DR-002-blue-thumb.jpg',
        one: 'https://i.ibb.co/VtkBp0Z/F-DR-002-blue-one.jpg',
        two: 'https://i.ibb.co/0sbhgFn/F-DR-002-blue-two.jpg',
      },
      gray: {
        thumbnail: 'https://i.ibb.co/QrM5h7h/F-DR-002-gray-thumb.jpg',
        one: 'https://i.ibb.co/9NkyXLM/F-DR-002-gray-one.jpg',
        two: 'https://i.ibb.co/0tt78xF/F-DR-002-gray-two.jpg',
      },
    },
  },
  {
    sku: 'F-DR-003',
    displayName: 'Skort',
    brand: 'Tranquility',
    price: 250,
    colors: ['purple'],
    stocks: {
      purple: {
        sm: 2,
        md: 6,
        lg: 8,
        xl: 3,
      },
    },
    imageUrls: {
      purple: {
        thumbnail: 'https://i.ibb.co/FqhnYkS/F-DR-003-purple-thumb.jpg',
        one: 'https://i.ibb.co/Qcf6cRj/F-DR-003-purple-one.jpg',
        two: null,
      },
    },
  },
  {
    sku: 'F-DR-004',
    displayName: 'Double Zipper Front Bodycon Mini Skirt',
    brand: 'Floerns',
    price: 299,
    colors: ['brown', 'green'],
    stocks: {
      brown: {
        sm: 2,
        md: 2,
        lg: 4,
        xl: 0,
      },
      green: {
        sm: 4,
        md: 3,
        lg: 1,
        xl: 0,
      },
    },
    imageUrls: {
      brown: {
        thumbnail: 'https://i.ibb.co/FKZr8PX/F-DR-004-brown-thumb.jpg',
        one: 'https://i.ibb.co/PgrMbvt/F-DR-004-brown-one.jpg',
        two: 'https://i.ibb.co/xL5Nwsy/F-DR-004-brown-two.jpg',
      },
      green: {
        thumbnail: 'https://i.ibb.co/HCjzSHZ/F-DR-004-green-thumb.jpg',
        one: 'https://i.ibb.co/S5BPcJJ/F-DR-004-green-one.jpg',
        two: 'https://i.ibb.co/StQxfGR/F-DR-004-green-two.jpg',
      },
    },
  },
  {
    sku: 'F-DR-005',
    displayName: 'Loose Flowy Swing Shift Dresses',
    brand: 'Nautica',
    price: 339,
    colors: ['caramel', 'purple'],
    stocks: {
      caramel: {
        sm: 6,
        md: 2,
        lg: 3,
        xl: 5,
      },
      purple: {
        sm: 2,
        md: 15,
        lg: 6,
        xl: 7,
      },
    },
    imageUrls: {
      caramel: {
        thumbnail: 'https://i.ibb.co/ZNBr4zw/F-DR-005-caramel-thumb.jpg',
        one: 'https://i.ibb.co/bRyZtKk/F-DR-005-caramel-one.jpg',
        two: 'https://i.ibb.co/5cXMWMw/F-DR-005-caramel-two.jpg',
      },
      purple: {
        thumbnail: 'https://i.ibb.co/yqhGjvC/F-DR-005-purple-thumb.jpg',
        one: 'https://i.ibb.co/dtBFYbM/F-DR-005-purple-one.jpg',
        two: 'https://i.ibb.co/SyPRhdx/F-DR-005-purple-two.jpg',
      },
    },
  },
];

export default womenDresses;
