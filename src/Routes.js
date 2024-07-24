import React from "react";
import Cart from "./pages/Cart";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Product from "./pages/Product";
import SignUp from "./pages/SignUp";
import ProductByCategory from "./pages/ProductByCategory";

const routes = [
  { path: "/", element: <Home /> },
  { path: "/login", element: <Login /> },
  { path: "/signup", element: <SignUp /> },
  { path: "/product/:pid", element: <Product /> },
  { path: "/cart", element: <Cart /> },
  { path: "/category/:cid", element: <ProductByCategory /> },
];

export default routes;
