/** @format */

import { useEffect, useState } from "react";
import { deleteCartRoute, getCartRoute } from "./API/cartApi";
import { useNavigate, useLocation } from "react-router-dom";

const AddCart = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [cartProducts, setCartProducts] = useState([]);
  const getAllCartList = async () => {
    try {
      const res = await getCartRoute();
      setCartProducts(res?.data);
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    getAllCartList();
  }, []);
  const onRemoveCartProduct = async (id) => {
    try {
      const res = await deleteCartRoute(id);
      if (res?.data?.message === "Product is removed from the cart") {
        getAllCartList();
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div>
      <h1> Your Cart List</h1>
      {cartProducts?.map((p) => {
        return (
          <div key={p?._id} style={{ display: "flex" }}>
            <img
              src={p?.productimage}
              alt={p?.productname}
              height={200}
              width={200}
            />
            <div>
              <h4>{p?.productname}</h4>
              <p>{p?.productdescription}</p>
              <p>{p?.productprice}</p>
              <p>{p?.producttype}</p>
              <p>{p?.productdiscount}</p>
              <p>{p?.productrating}</p>
              <p>{p?.productsoldcount}</p>
              <button
                onClick={() => onRemoveCartProduct(p._id)}
                className="cartBtn"
              >
                Remove from cart
              </button>
              <button className="btns">Place your order now</button>
            </div>
          </div>
        );
      })}
    </div>
  );
};
export default AddCart;
