/** @format */

import axios from "axios";

const url = "http://localhost:8080";

const getUsers = async () => {
  try {
    const res = await axios.get(url + `/users`);
    return res;
  } catch (e) {
    console.log(e);
  }
};
const registerRoute = async (formData) => {
  try {
    const res = await axios.post(url + `/register`, formData);
    return res;
  } catch (e) {
    console.log(e);
  }
};
const loginRoute = async (formData) => {
  try {
    const res = await axios.post(url + `/login`, formData);
    return res;
  } catch (e) {
    console.log(e);
  }
};
export { getUsers, registerRoute, loginRoute };
