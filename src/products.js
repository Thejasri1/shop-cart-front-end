/** @format */
import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getCartRoute, postCartRoute } from "./API/cartApi";
import "./App.css";
import { BiSearch } from "react-icons/bi";
import Star from "./Star";
import AddCart from "./cart";
import { FaShopify } from "react-icons/fa";
import {
  AiOutlineLogout,
  AiOutlineShoppingCart,
  AiOutlineHome,
  AiOutlineUserAdd,
} from "react-icons/ai";
import { LuShoppingBag } from "react-icons/lu";
import { SiShopify } from "react-icons/si";

const Products = () => {
  const url =
    process.env.NODE_ENV === "development"
      ? "http://localhost:8080"
      : "https://tejasree-project.onrender.com";
  const [cartCount, setCartCount] = useState("");
  const location = useLocation();
  const navigate = useNavigate();
  const [countQuantity, setCountQuantity] = useState(1);
  const [searchItems, setSearchItems] = useState("");
  const [viewMode, setViewMode] = useState("home");
  const [token, setToken] = useState(location?.state);
  const [productsList, setProductsList] = useState([]);
  const [productId, setProductId] = useState("");
  const getAllProducts = async () => {
    try {
      if (token === null || token === "") {
        navigate("/", { state: null });
      } else {
        const getProducts = await axios.get(url + "/products", {
          headers: { "X-Token": token },
        });
        setProductsList(getProducts.data);
      }
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    getAllProducts();
  }, [token]);
  //Adding product details to the cart list
  const onDisplayAddCart = async (product) => {
    try {
      await postCartRoute(product);
      setViewMode("cart");
    } catch (e) {
      console.log(e);
    }
  };
  const onDisplayCart = (type) => {
    try {
      if (type === "cart") {
        setViewMode("cart");
      } else if (type === "home") {
        setViewMode("home");
      } else if (type === "soldProd") {
        navigate("/history", { state: token });
      }
    } catch (e) {
      console.log(e);
    }
  };
  const onSearchProduct = (e) => {
    try {
      setSearchItems(e.target.value);
    } catch (e) {
      console.log(e);
    }
  };
  const onDoSearch = async () => {
    try {
      let product = searchItems.toLocaleLowerCase();
      const res = await axios.get(url + `/searchbyproduct/${product}`);
      setProductsList(res?.data);
      if (res?.data.length == "") {
        getAllProducts();
      }
    } catch (e) {
      console.log(e);
    }
  };
  const onDispalyOrderForm = (product) => {
    try {
      navigate("/order", { state: [token, product, countQuantity] });
    } catch (e) {
      console.log(e);
    }
  };
  const onNaviagteToLogin = () => {
    try {
      navigate("/", { state: null });
    } catch (e) {
      console.log(e);
    }
  };
  const getCartItems = async () => {
    try {
      const res = await getCartRoute();
      setCartCount(res?.data.length);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getCartItems();
  }, [cartCount]);

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbarColor">
        <div className="container-fluid">
          <div style={{ display: "flex" }}>
            <LuShoppingBag className="logo" />
            <h4 className="shopcartTitle" onClick={onNaviagteToLogin}>
              Shop cart
            </h4>
          </div>
          <div className="navbar-nav" style={{ display: "fkex" }}>
            <input
              type="text"
              placeholder="search by price or name or type or discount"
              onChange={onSearchProduct}
              className="searchbar"
            />
            <div className="searchIcon" onClick={onDoSearch}>
              <BiSearch />
            </div>
          </div>
          <div>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNavAltMarkup"
              aria-controls="navbarNavAltMarkup"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
              <div className="navbar-nav">
                <button
                  onClick={() => navigate("/setting", { state: token })}
                  className="navOptions"
                >
                  <AiOutlineUserAdd className="itemIcon" />
                </button>
              </div>
              <div className="navbar-nav">
                <button
                  onClick={() => onDisplayCart("home")}
                  className="navOptions"
                >
                  <AiOutlineHome className="itemIcon" />
                </button>
              </div>
              <div className="navbar-nav">
                <button
                  onClick={() => onDisplayCart("cart")}
                  className="navOptions"
                >
                  <AiOutlineShoppingCart className="itemIcon" />
                  <sup
                    style={{
                      color: "red",
                      fontFamily: "serif",
                      fontSize: "15px",
                    }}
                  >
                    {cartCount}
                  </sup>
                </button>
              </div>
              <div className="navbar-nav">
                <button
                  onClick={() => onDisplayCart("soldProd")}
                  className="navOptions"
                >
                  <SiShopify className="itemIcon" />
                </button>
                <p
                  className="navOptions"
                  onClick={() => navigate("/", { state: location?.state[0] })}
                >
                  <AiOutlineLogout className="itemIcon" />
                </p>
              </div>
            </div>
          </div>
        </div>
      </nav>
      <div
        id="carouselExampleIndicators"
        className="carousel slide"
        data-bs-ride="carousel"
      >
        <div className="carousel-indicators">
          <button
            type="button"
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide-to="0"
            className="active"
            aria-current="true"
            aria-label="Slide 1"
          ></button>
          <button
            type="button"
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide-to="1"
            aria-label="Slide 2"
          ></button>
          <button
            type="button"
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide-to="2"
            aria-label="Slide 3"
          ></button>
        </div>
        <div className="carousel-inner">
          <div className="carousel-item ">
            <img
              src="https://m.media-amazon.com/images/I/71QRxZvKnGL._SX3000_.jpg"
              className="d-block w-100 carousalImg"
              alt="..."
            />
          </div>
          <div className="carousel-item active">
            <img
              src="https://m.media-amazon.com/images/I/61zAjw4bqPL._SX3000_.jpg"
              className="d-block w-100 carousalImg"
              alt="..."
            />
          </div>
          <div className="carousel-item">
            <img
              src="https://m.media-amazon.com/images/I/81KkrQWEHIL._SX3000_.jpg"
              className="d-block w-100 carousalImg"
              alt="..."
            />
          </div>
        </div>
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleIndicators"
          data-bs-slide="prev"
        >
          <span
            className="carousel-control-prev-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselExampleIndicators"
          data-bs-slide="next"
        >
          <span
            className="carousel-control-next-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
      {viewMode === "home" ? (
        <div className="container-fluid cardsSection">
          {productsList?.map((product) => {
            let pId = product?._id;
            return (
              <div className="row">
                {
                  <div
                    className="card productCardContainer"
                    style={{ width: "18rem" }}
                    key={product._id}
                  >
                    <img
                      src={product.productimage}
                      className="card-img-top"
                      alt={product.productname}
                    />
                    <div className="cardBody">
                      <h5 className="card-title">{product?.productname}</h5>
                      <p style={{ lineHeight: "15px" }}>
                        {product?.productdescription}
                      </p>
                      <Star star={product?.productrating} />
                      <h5>
                        <p>
                          <sub>
                            <i>
                              Price :
                              <del>
                                {product?.productprice +
                                  product?.productdiscount}
                                ₹
                              </del>
                            </i>
                          </sub>
                          <sup>
                            <i>{product?.productprice}₹</i>
                          </sup>
                        </p>
                      </h5>
                      <p>
                        <i>Discount : {product?.productdiscount}</i>
                      </p>
                      <p>{product?.productcolor}</p>
                      <p>Product :{product?.producttype}</p>
                      <p style={{ paddingTop: "10px" }}>
                        <spam style={{ color: "blue" }}>Sold :</spam>
                        <i>{product?.productsoldcount}</i>
                      </p>
                    </div>
                    <div className="d-flex mb-5">
                      <b>
                        <i style={{ color: "maroon" }}>
                          Quantity :
                          <input
                            type="number"
                            id={product?._id}
                            value={pId === productId ? countQuantity : 1}
                            onChange={(e) => {
                              setProductId(product?._id);
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
                    <div style={{ display: "flex" }}>
                      <button
                        onClick={() => onDisplayAddCart(product)}
                        className="btns"
                      >
                        <AiOutlineShoppingCart
                          style={{ color: "white", marginRight: "5px" }}
                        />
                        Add to cart
                      </button>
                      <button
                        className="btns"
                        style={{ backgroundColor: "green", color: "white" }}
                        onClick={() => onDispalyOrderForm(product)}
                      >
                        <FaShopify /> Order Now
                      </button>
                    </div>
                  </div>
                }
              </div>
            );
          })}
        </div>
      ) : (
        <div>
          <AddCart />
        </div>
      )}
    </div>
  );
};
export default Products;
