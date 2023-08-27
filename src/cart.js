/** @format */

import { useEffect, useState } from "react";
import { deleteCartRoute, getCartRoute } from "./API/cartApi";
import { useNavigate, useLocation } from "react-router-dom";
import Star from "./Star";
import "./cart.css";

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
  const onDisplayOrderPage = (product) => {
    try {
      navigate("/order", { state: [location?.state, product] });
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="containerMain">
      <h1 className="cartTitle"> Your Cart List</h1>
      {cartProducts?.map((p) => {
        return (
          <div key={p?._id} className="cartContainer">
            <img
              src={p?.productimage}
              alt={p?.productname}
              height={200}
              width={200}
              style={{ borderRadius: "10px" }}
            />
            <div>
              <h4>{p?.productname}</h4>
              <h5>
                <sub>
                  <i>price :{p?.productprice}$</i>
                </sub>
                <sup>
                  <i>{p?.productdiscount}</i>
                </sup>
              </h5>
              <p>{p?.producttype}</p>
              <Star star={p?.productrating} />
              <p style={{ paddingTop: "10px" }}>
                <spam style={{ color: "blue" }}>Sold :</spam>
                <i>{p?.productsoldcount}</i>
              </p>
              <button
                onClick={() => onRemoveCartProduct(p._id)}
                className="cartBtn"
              >
                Remove from cart
              </button>
              <button className="btns" onClick={() => onDisplayOrderPage(p)}>
                Place your order now
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};
export default AddCart;
