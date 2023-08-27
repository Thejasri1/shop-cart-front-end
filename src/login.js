/** @format */

import { loginRoute } from "./API/userRoutes";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import "./account.css";

const Login = () => {
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const onChangeFormData = (e) => {
    try {
      let name = e.target.name;
      let value = e.target.value;
      setFormData((ps) => ({ ...ps, [name]: value }));
    } catch (e) {
      console.log(e);
    }
  };
  const onSubmitFormData = async () => {
    try {
      const res = await loginRoute(formData);
      const tokenObj = res?.data?.token;
      if (tokenObj) {
        navigate("/products", { state: tokenObj });
      } else {
        navigate("/", { state: null });
      }
      setMessage("");
    } catch (e) {
      setMessage(e?.response?.data?.message);
    }
  };
  const onFormSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <div>
      <p style={{ color: "red" }}>{message}</p>
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
        <br />
        <button onClick={onSubmitFormData} className="authBtns mt-3 mx-5 mb-3">
          Login
        </button>
      </form>
    </div>
  );
};
export default Login;
