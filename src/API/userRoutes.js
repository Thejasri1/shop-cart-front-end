/** @format */

import axios from "axios";

const url = "http://localhost:8080";

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
export { registerRoute, loginRoute };
