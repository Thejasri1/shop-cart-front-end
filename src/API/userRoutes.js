/** @format */

import axios from "axios";

const url =
  process.env.NODE_ENV === "development"
    ? "http://localhost:8080"
    : "https://shop-cart-6zmr.onrender.com";

const getUsers = async () => {
  const res = await axios.get(url + `/users`);
  return res;
};
const registerRoute = async (formData) => {
  const res = await axios.post(url + `/register`, formData);
  return res;
};
const loginRoute = async (formData) => {
  const res = await axios.post(url + `/login`, formData);
  return res;
};
const updatePasswordRoute = async (id, formData) => {
  const res = await axios.patch(url + `/register/${id}`, formData);
  return res;
};
export { getUsers, registerRoute, loginRoute, updatePasswordRoute };
