/** @format */

import React, { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import "./email.css";
import "./App.css";
import { useLocation, useNavigate } from "react-router-dom";

const Email = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const form = useRef();
  const [orderText, setOrderText] = useState("Order Now");
  const sendEmail = (e) => {
    e.preventDefault();
    emailjs
      .sendForm(
        "service_qrf1vch",
        "template_yp44day",
        form.current,
        "vdvuTh_pQbNuk-bA8"
      )
      .then(
        (result) => {
          console.log(result.text);
          let res =
            result.text.toLocaleLowerCase() === "ok"
              ? "Order placed"
              : "Order Now";
          setOrderText(res);
        },
        (error) => {
          console.log(error.text);
        }
      );
  };
  const productDetails = `Your product :  ${location.state[1].productname}\n  product : ${location.state[1].producttype}\n  price : ${location.state[1].productprice}\n`;
  const orderMsg = "Your product will be reached in 5 days";
  const onDisplayHome = (type) => {
    try {
      if (type === "home") {
        navigate("/products", { state: location?.state[0] });
      } else if (type === "viewcart") {
        navigate("/cart", { state: location?.state[0] });
      }
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <div className="emailContainer">
      <nav className="navbarColor">
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <div style={{ display: "flex" }}>
            <img
              src="https://png.pngtree.com/png-vector/20190329/ourlarge/pngtree-vector-shopping-bag-icon-png-image_889429.jpg"
              height={40}
              width={40}
            />
            <h4 className="shopcartTitle">Shop cart</h4>
          </div>
          <div className="flexContainer">
            <p className="navOptions" onClick={() => onDisplayHome("home")}>
              Home
            </p>
            <p className="navOptions" onClick={() => onDisplayHome("viewcart")}>
              View Cart
            </p>
          </div>
        </div>
      </nav>
      <div className="emailPage">
        <form ref={form} onSubmit={sendEmail}>
          <label>Enter Name :</label>
          <br />
          <input type="text" name="user_name" placeholder="Enter your name" />
          <br />
          <label>Enter Email :</label> <br />
          <input
            type="email"
            name="user_email"
            placeholder="example@gmail.com"
          />
          <br />
          <label>Enter Address :</label> <br />
          <textarea name="message" placeholder="Enter address" /> <br />
          <textarea
            name="address"
            defaultValue={productDetails}
            style={{ display: "none" }}
          />
          <textarea
            name="orderMessage"
            defaultValue={orderMsg}
            style={{ display: "none" }}
          />
          <br />
          <button
            type="submit"
            className={orderText == "Order Now" ? "orderBtn" : "orderPlaced"}
          >
            {orderText}
          </button>
        </form>
      </div>
    </div>
  );
};
export default Email;
