# **Dressaholic-next**
> **Disclaimer**  
This is a personal project created for self-educational purposes only. The project is not intended for commercial use and should not be used for any business purposes. The sample data provided in the project is for demonstration purposes only and should not be used in a production environment.

## **Introduction**
Dressaholic is a simple e-commerce web application designed for users to browse, filter and purchase clothing items.

You can visit the demo site here: {url}

## **Tech Stacks**
This project is built using the following technologies, services and libraries:
- `HTML & CSS` (with `TailwindCSS` for utility-first styling and responsive design, and component library `daisy-ui`)
- `TypeScript`
- `Next.js` (with page routers)
- `Jotai` & `Immer` - `Jotai` uses atoms for global state management, while `Immer` simplifies state updates by creating a new immutable state behind the scenes.
- `Framer Motion` for creating smooth and performant animations and page transitions.
- `Firebase` for user authentication and database
- `GraphQL` with `@apollo/server` and `@apollo/client` for efficient data fetching and manipulation.
- `Stripe` for payment processing

## **Features**
1. **User Authentication** - Users can sign in using their existing Google account or register a new account.
2. **Product Filtering** - Users can filter products by brand and price range.
3. **Shopping Cart** - Users can add products to their cart and proceed to place an order by providing customer information.
4. **Payment** - Users can securely pay for their order using a test credit card.
5. **Persistent Cart** - Users' cart items are stored in the database, ensuring that items are not lost upon logout.
6. **Accessibility** - With aria-labels on interactive elements; also users can use keyboard to navigate the site.

## **Getting Started**
To run this project locally, follow these steps:
1. Clone the repository: `git clone https://github.com/yourusername/dressaholic.git`
2. Install dependencies: `npm install` or `yarn install`
3. Set up environment variables for Firebase and Stripe.
4. Start the development server: `npm run dev` or `yarn dev`
5. Open your browser and navigate to http://localhost:3000

## **Credits**
- Logo: [flaticon](https://www.flaticon.com/free-icons/letter-d)
- Pictures on HomePage: [Unsplash](https://unsplash.com/)
- Product pictures: [Costco](https://www.costco.com/), [UNIQLO](https://www.uniqlo.com/) & [Decathlon](https://www.decathlon.com/)

## **Screenshots**

> **Home page**

![home-page](others/misc/home-page.png)

> **Auth page**

![auth-page](others/misc/auth-page.png)

> **Category page for men**

![category-page-men](others/misc/category-page-men.png)

> **Category page for women**

![category-page-women](others/misc//category-page-women.png)

> **List of products page**

![product-list-page](others/misc/product-lists-page.png)

> **Product detail page**

![product-detail-page](others/misc/product-detail-page.png)

> **Cart page**

![cart-page](others/misc/cart-page.png)

> **Order page**

![order-page](others/misc/order-page.png)
