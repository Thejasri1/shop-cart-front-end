/** @format */

import { useEffect, useState } from "react";
import { getSoldProducts } from "./API/addressRoutes";
import { LuShoppingBag } from "react-icons/lu";
import {
  AiOutlineLogout,
  AiOutlineHome,
  AiOutlineUserAdd,
} from "react-icons/ai";
import { useLocation, useNavigate } from "react-router-dom";
import Star from "./Star";

const HistoryProducts = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [historyProducts, setHistoryProducts] = useState([]);
  const getAllProducts = async () => {
    try {
      const res = await getSoldProducts();
      setHistoryProducts(res?.data);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getAllProducts();
  }, []);

  return (
    <div className="historyContainer">
      <nav className="navbarColor">
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <div style={{ display: "flex" }}>
            <LuShoppingBag className="logo" />
            <h4
              className="shopcartTitle"
              onClick={() => navigate("/", { state: null })}
            >
              Shop cart
            </h4>
          </div>
          <div className="flexContainer">
            <button
              onClick={() => navigate("/setting", { state: location?.state })}
              className="navOptions"
            >
              <AiOutlineUserAdd className="itemIcon" />
            </button>
            <p
              className="navOptions"
              onClick={() => navigate("/products", { state: location?.state })}
            >
              <AiOutlineHome className="itemIcon" />
            </p>
            <p
              className="navOptions"
              onClick={() => navigate("/", { state: location?.state })}
            >
              <AiOutlineLogout className="itemIcon" />
            </p>
          </div>
        </div>
      </nav>
      {historyProducts?.map((p) => {
        return (
          <div
            key={p?._id}
            style={{
              display: "flex",
              margin: "20px",
              borderRadius: "5px",
              backgroundColor: "white",
              padding: "20px",
            }}
          >
            <img
              src={p?.productimage}
              alt={p?.productname}
              height={200}
              width={200}
              style={{ borderRadius: "10px", marginRight: "40px" }}
            />
            <div>
              <h4>{p?.productname}</h4>
              <p>{p?.productcolor}</p>
              <i>Quantity :{p?.quantity}</i>
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
            </div>
          </div>
        );
      })}
    </div>
  );
};
export default HistoryProducts;
