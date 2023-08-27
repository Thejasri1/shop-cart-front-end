/** @format */
import { useState } from "react";
import Login from "./login";
import Register from "./register";

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
      <div className="loginContainer">
        {selectedAccType === "login" ? (
          <div>
            <Login />
            <b
              onClick={() => displayAccType("register")}
              style={{
                color: "red",
                paddingRight: "100px",
              }}
            >
              <i>Forgot password</i>
            </b>
            <b
              onClick={() => displayAccType("register")}
              style={{ color: "red" }}
            >
              <i>Create account</i>
            </b>
          </div>
        ) : (
          <div>
            <Register />
            <b
              style={{ color: "red", paddingLeft: "50px" }}
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
