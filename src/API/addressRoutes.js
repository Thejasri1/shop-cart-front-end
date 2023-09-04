/** @format */

import axios from "axios";

const url =
  process.env.NODE_ENV === "development"
    ? "http://127.0.0.1:8080"
    : "https://tejasree-project.onrender.com";

const getAddress = async () => {
  try {
    const res = await axios.get(url + `/address`);
    return res;
  } catch (e) {
    console.log(e);
  }
};
const postAddress = async (formData) => {
  try {
    const res = await axios.post(url + `/address`, formData);
    return res;
  } catch (e) {
    console.log(e);
  }
};
const updateAddress = async (id, formData) => {
  try {
    const res = await axios.patch(url + `/address/${id}`, formData);
    return res;
  } catch (e) {
    console.log(e);
  }
};
const deleteAddress = async (id) => {
  try {
    const res = await axios.delete(url + `/address/${id}`);
    return res;
  } catch (e) {
    console.log(e);
  }
};
const getSoldProducts = async () => {
  try {
    const res = await axios.get(url + `/soldproducts`);
    return res;
  } catch (e) {
    console.log(e);
  }
};
const postSoldProd = async (formData) => {
  try {
    const res = await axios.post(url + `/soldproduct`, formData);
    return res;
  } catch (e) {
    console.log(e);
  }
};
export {
  getAddress,
  postAddress,
  updateAddress,
  deleteAddress,
  getSoldProducts,
  postSoldProd,
};
