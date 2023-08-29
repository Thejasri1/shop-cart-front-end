/** @format */

import { loginRoute } from "./API/userRoutes";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { getUsers } from "./API/userRoutes";
import "./account.css";

const Login = () => {
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [forgotPassword, setForgotPassword] = useState("");
  const [passwordMode, setPasswordMode] = useState("password");

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
  let tokenObj = null;
  const onSubmitFormData = async () => {
    try {
      const res = await loginRoute(formData);
      tokenObj = res?.data?.token;
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
  const onDisplayPasswordContainer = async (type) => {
    try {
      if (type === "forgotPassword") {
        setPasswordMode("forgotPassword");
      } else if (type === "password") {
        setPasswordMode("password");
      }
      const res = await getUsers();
      const filterData = res?.data?.filter((x) => x.email === formData.email);
      let data = filterData[0].password;
      setForgotPassword(data);
    } catch (e) {
      console.log(e);
    }
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
        {passwordMode === "forgotPassword" && (
          <h1 className="forgotPass" hidden={formData.email === ""}>
            Your password :{forgotPassword}
          </h1>
        )}
        <br />
        <b style={{ color: "blue" }}>
          <i onClick={() => onDisplayPasswordContainer("forgotPassword")}>
            Forgot password
          </i>
        </b>
        <b style={{ color: "blue", paddingLeft: "80px" }}>
          <i onClick={() => navigate("/setting", { state: tokenObj })}>
            Change Password
          </i>
        </b>
        <br />
        <button onClick={onSubmitFormData} className="authBtns mt-3 mx-5 mb-3">
          Login
        </button>
      </form>
    </div>
  );
};
export default Login;
