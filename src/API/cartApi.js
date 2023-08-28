/** @format */

import axios from "axios";

const url =
  process.env.NODE_ENV === "development"
    ? "http://127.0.0.1:8080"
    : "https://shop-cart-6zmr.onrender.com";

const getCartRoute = async () => {
  try {
    const res = await axios.get(url + `/cart`);
    return res;
  } catch (e) {
    console.log(e);
  }
};
const postCartRoute = async (formData) => {
  try {
    const res = await axios.post(url + `/cart`, formData);
    return res;
  } catch (e) {
    console.log(e);
  }
};
const deleteCartRoute = async (id) => {
  try {
    const res = await axios.delete(url + `/cart/${id}`);
    return res;
  } catch (e) {
    console.log(e);
  }
};
export { getCartRoute, postCartRoute, deleteCartRoute };
