/** @format */
import { useState } from "react";
import Login from "./login";
import Register from "./register";
import { LuShoppingBag } from "react-icons/lu";
import "./App.css";
import "./email.css";

const Account = () => {
  const [selectedAccType, setSelectedAccType] = useState("login");
  const displayAccType = (item) => {
    if (item === "register") {
      setSelectedAccType("register");
    } else {
      setSelectedAccType("login");
    }
  };

  return (
    <div className="mainContainer">
      <div
        style={{
          display: "flex",
        }}
        className="navbarColor"
      >
        <div style={{ display: "flex" }}>
          <LuShoppingBag className="logo" />
          <h4 className="shopcartTitle">Shop cart</h4>
        </div>
      </div>
      <div className="loginContainer">
        {selectedAccType === "login" ? (
          <div>
            <Login />
            <b
              onClick={() => displayAccType("register")}
              style={{ color: "blue", paddingLeft: "50px" }}
            >
              <i>Create account</i>
            </b>
          </div>
        ) : (
          <div>
            <Register />
            <b
              style={{ color: "blue", paddingLeft: "50px" }}
              onClick={() => displayAccType("login")}
            >
              <i>Already have a account login</i>
            </b>
          </div>
        )}
      </div>
    </div>
  );
};
export default Account;
