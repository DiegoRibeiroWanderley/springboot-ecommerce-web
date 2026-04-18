import React, { useEffect } from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/home/Home";
import Products from "./components/products/Products";
import NavigationBar from "./components/shared/NavigationBar";
import About from "./components/About";
import Contact from "./components/Contact";
import { Toaster } from "react-hot-toast";
import Cart from "./components/cart/Cart";
import Login from "./components/auth/Login";
import { useDispatch } from "react-redux";
import { currentUser, fetchCart } from "./store/actions";
import { PrivateRoute } from "./components/PrivateRout";
import { Register } from "./components/auth/Register";
import Checkout from "./components/checkout/Checkout";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCart());
    dispatch(currentUser());
  }, [dispatch]);

  return (
    <React.Fragment>
      <BrowserRouter>
        <NavigationBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/cart" element={<Cart />} />

          <Route path="/" element={<PrivateRoute />}>
            <Route path="/checkout" element={<Checkout />} />
          </Route>

          <Route path="/" element={<PrivateRoute />}>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Route>
        </Routes>
      </BrowserRouter>
      <Toaster position="bottom-center" />
    </React.Fragment>
  );
}

export default App;
