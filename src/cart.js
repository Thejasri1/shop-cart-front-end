/** @format */

import { useEffect, useState } from "react";
import { deleteCartRoute, getCartRoute } from "./API/cartApi";
import { useNavigate, useLocation } from "react-router-dom";
import Star from "./Star";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { FaShopify } from "react-icons/fa";
import "./cart.css";

const AddCart = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [cartProducts, setCartProducts] = useState([]);
  const [countQuantity, setCountQuantity] = useState(1);
  const [productId, setProductId] = useState("");

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
      navigate("/order", { state: [location?.state, product, countQuantity] });
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="containerMain">
      <h1 className="cartTitle"> Your Cart List</h1>
      {cartProducts?.map((p) => {
        let pId = p?._id;
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
                <p>
                  <sub>
                    <i>
                      Price :<del>{p?.productprice + p?.productdiscount}₹</del>
                    </i>
                  </sub>
                  <sup>
                    <i>{p?.productprice}₹</i>
                  </sup>
                </p>
              </h5>
              <p>
                <i>Discount : {p?.productdiscount}</i>
              </p>
              <p>{p?.producttype}</p>
              <div className="d-flex mb-5">
                <b>
                  <i style={{ color: "maroon" }}>
                    Quantity :
                    <input
                      type="number"
                      id={p?._id}
                      value={pId === productId ? countQuantity : 1}
                      onChange={(e) => {
                        setProductId(p?._id);
                        setCountQuantity(e.target.value);
                      }}
                      style={{
                        width: "100px",
                        marginLeft: "10px",
                        color: "maroon",
                      }}
                    />
                  </i>
                </b>
              </div>
              <Star star={p?.productrating} />
              <p style={{ paddingTop: "10px" }}>
                <spam style={{ color: "blue" }}>Sold :</spam>
                <i>{p?.productsoldcount}</i>
              </p>
              <button
                onClick={() => onRemoveCartProduct(p._id)}
                className="cartBtn"
              >
                <AiOutlineShoppingCart
                  style={{ color: "white", marginRight: "5px" }}
                />
                Remove from cart
              </button>
              <button className="btns" onClick={() => onDisplayOrderPage(p)}>
                <FaShopify style={{ color: "white", marginRight: "5px" }} />
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
