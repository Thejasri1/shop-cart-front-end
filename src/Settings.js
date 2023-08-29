/** @format */

import { useLocation, useNavigate } from "react-router-dom";
import { LuShoppingBag } from "react-icons/lu";
import { AiOutlineLogout, AiOutlineHome } from "react-icons/ai";
import "./App.css";
import { useEffect, useState } from "react";
import { getUsers, updatePasswordRoute } from "./API/userRoutes";

const Settings = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmpassword: "",
  });
  const [allUsers, setAllUsers] = useState([]);
  const [message, setMessage] = useState("");
  const onChangeFormData = (e) => {
    try {
      let name = e.target.name;
      let value = e.target.value;
      setFormData((ps) => ({ ...ps, [name]: value }));
    } catch (e) {
      console.log(e);
    }
  };
  const onFormSubmit = (e) => {
    e.preventDefault();
  };
  const onSubmitFormData = async () => {
    try {
      const matchedDoc = allUsers.filter((x) => x?.email === formData?.email);
      let password = {
        password: formData.password,
        confirmpassword: formData.confirmpassword,
      };
      const res = await updatePasswordRoute(matchedDoc[0]?._id, password);
      if (res?.data?.message === "password updated") {
        setMessage("password updated");
      }
    } catch (e) {
      console.log(e);
      setMessage(e?.response?.data?.message);
    }
  };
  const getAllUsers = async () => {
    try {
      const res = await getUsers();
      setAllUsers(res?.data);
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    getAllUsers();
  }, []);
  return (
    <div className="mainContainer">
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
      <div className="loginContainer">
        {message === "password updated" ? (
          <p style={{ color: "green" }}>Password Updated</p>
        ) : (
          <p style={{ color: "red" }}>{message}</p>
        )}
        <form onSubmit={onFormSubmit}>
          <label>Enter Email :</label> <br />
          <input
            type="text"
            name="email"
            onChange={onChangeFormData}
            className="input"
          />
          <br />
          <label>Enter Password :</label> <br />
          <input
            type="password"
            name="password"
            onChange={onChangeFormData}
            className="input"
          />
          <br />
          <label>Enter Confirm password :</label> <br />
          <input
            type="password"
            name="confirmpassword"
            onChange={onChangeFormData}
            className="input"
          />
          <br />
          <button
            onClick={onSubmitFormData}
            className="authBtns mt-3 mx-5 mb-3"
          >
            Change Password
          </button>
        </form>
      </div>
    </div>
  );
};
export default Settings;
