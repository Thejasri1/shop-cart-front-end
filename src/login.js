/** @format */

import { loginRoute } from "./API/userRoutes";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

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
    } catch (e) {
      setMessage(e?.response?.data?.message);
    }
  };
  const onFormSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <div>
      <form onSubmit={onFormSubmit}>
        <label>Enter Email :</label> <br />
        <input type="text" name="email" onChange={onChangeFormData} /> <br />
        <label>Enter Password :</label> <br />
        <input type="password" name="password" onChange={onChangeFormData} />
        <br />
        <br />
        <button onClick={onSubmitFormData}>Login</button>
      </form>
    </div>
  );
};
export default Login;
