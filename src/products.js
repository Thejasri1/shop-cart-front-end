/** @format */
import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { postCartRoute } from "./API/cartApi";
import "./App.css";
import { BiSearch } from "react-icons/bi";
import Star from "./Star";
import AddCart from "./cart";

const Products = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [searchItems, setSearchItems] = useState("");
  const [viewMode, setViewMode] = useState("home");
  const [token, setToken] = useState(location?.state);
  const [productsList, setProductsList] = useState([]);
  const getAllProducts = async () => {
    try {
      if (token === null || token === "") {
        navigate("/", { state: null });
      } else {
        const getProducts = await axios.get("http://localhost:8080/products", {
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
      const res = await axios.get(
        `http://localhost:8080/searchbyproduct/${product}`
      );
      setProductsList(res?.data);
      if (res?.data.length == "") {
        getAllProducts();
      }
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbarColor">
        <div className="container-fluid">
          <div style={{ display: "flex" }}>
            <img
              src="https://png.pngtree.com/png-vector/20190329/ourlarge/pngtree-vector-shopping-bag-icon-png-image_889429.jpg"
              height={40}
              width={40}
            />
            <h4 className="shopcartTitle">Shop cart</h4>
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
                  onClick={() => onDisplayCart("home")}
                  className="navOptions"
                >
                  Home
                </button>
              </div>
              <div className="navbar-nav">
                <button
                  onClick={() => onDisplayCart("cart")}
                  className="navOptions"
                >
                  View cart
                </button>
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
          <div className="carousel-item active">
            <img
              src="https://m.media-amazon.com/images/I/71QRxZvKnGL._SX3000_.jpg"
              className="d-block w-100 carousalImg"
              alt="..."
            />
          </div>
          <div className="carousel-item">
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
        <div>
          {productsList?.map((product) => {
            return (
              <div>
                {
                  <div
                    className="card"
                    style={{ width: "18rem" }}
                    key={product._id}
                  >
                    <img
                      src={product.productimage}
                      className="card-img-top"
                      alt={product.productname}
                    />
                    <div className="card-body">
                      <h5 className="card-title">{product?.productname}</h5>
                      <p className="card-text">{product?.productdescription}</p>
                      <p className="card-text">{product?.productsoldcount}</p>
                      <p className="card-text">{product?.productcolor}</p>
                      <p className="card-text">{product?.producttype}</p>
                      <p className="card-text">{product?.productdiscount}</p>
                      <p className="card-text">{product?.productrating}</p>
                      <Star star={product?.productrating} />
                      <p className="card-text">{product?.productprice}</p>
                      <div style={{ display: "flex" }}>
                        <button
                          onClick={() => onDisplayAddCart(product)}
                          className="btns"
                        >
                          Add to cart
                        </button>
                        <button className="btns">Order Now</button>
                      </div>
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