/** @format */

import Account from "./Account";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./register";
import Login from "./login";
import Products from "./products";
import AddCart from "./cart";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Account />}></Route>
        <Route path="/register" element={<Register />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/products" element={<Products />}></Route>
        <Route path="/cart" element={<AddCart />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;