/** @format */

import { useState } from "react";
import { registerRoute } from "./API/userRoutes";

const Register = () => {
  const [message, setMessage] = useState("");
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmpassword: "",
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
      const res = await registerRoute(formData);
      if (res?.data?.message) {
        setMessage("Registered Successfully");
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
      {message == "Registered Successfully" ? (
        <p style={{ color: "green" }}>{message}</p>
      ) : (
        <p style={{ color: "red" }}>{message}</p>
      )}
      <form onSubmit={onFormSubmit}>
        <label>Enter Username :</label>
        <br />
        <input type="text" name="username" onChange={onChangeFormData} /> <br />
        <label>Enter Email :</label> <br />
        <input type="text" name="email" onChange={onChangeFormData} /> <br />
        <label>Enter Password :</label> <br />
        <input type="password" name="password" onChange={onChangeFormData} />
        <br />
        <label>Enter Confirmpassword :</label> <br />
        <input
          type="password"
          name="confirmpassword"
          onChange={onChangeFormData}
        />
        <br />
        <button onClick={onSubmitFormData}>Register</button>
      </form>
    </div>
  );
};
export default Register;
