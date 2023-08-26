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
    <div>
      {selectedAccType === "login" ? (
        <div>
          <Login />
          <p>or</p>
          <p
            onClick={() => displayAccType("register")}
            style={{ color: "blue" }}
          >
            Create account
          </p>
        </div>
      ) : (
        <div>
          <Register />
          <p>or</p>
          <p style={{ color: "blue" }} onClick={() => displayAccType("login")}>
            Already have a account login
          </p>
        </div>
      )}
    </div>
  );
};
export default Account;
