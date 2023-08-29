/** @format */

import React, { useEffect, useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import "./email.css";
import "./App.css";
import { AiOutlineHome } from "react-icons/ai";
import { LuShoppingBag } from "react-icons/lu";
import { useLocation, useNavigate } from "react-router-dom";
import {
  deleteAddress,
  getAddress,
  postAddress,
  postSoldProd,
  updateAddress,
} from "./API/addressRoutes";
import Star from "./Star";
import { SiShopify } from "react-icons/si";

const Email = () => {
  const location = useLocation();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    contact: "",
    state: "",
    city: "",
    address: "",
    landmark: "",
    pincode: "",
    quantity: location?.state[2],
  });
  const [AddressList, setAddressList] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState("");
  const navigate = useNavigate();
  const form = useRef();
  const [orderText, setOrderText] = useState("Order Now");
  const sendEmail = (e) => {
    e.preventDefault();
    emailjs
      .sendForm(
        "service_qrf1vch",
        "template_jf8tvw2",
        form.current,
        "vdvuTh_pQbNuk-bA8"
      )
      .then(
        (result) => {
          let res =
            result.text.toLocaleLowerCase() === "ok"
              ? "Order placed"
              : "Order Now";
          setOrderText(res);
        },
        (error) => {
          console.log(error.text);
        }
      );
  };
  const productDetails = `Your product :  ${location.state[1].productname}\n  product : ${location.state[1].producttype}\n  price : ${location.state[1].productprice}\n quantity :${location?.state[2]}`;

  const onDisplayHome = (type) => {
    try {
      if (type === "home") {
        navigate("/products", { state: location?.state[0] });
      } else if (type === "viewcart") {
        navigate("/cart", { state: location?.state[0] });
      }
    } catch (e) {
      console.log(e);
    }
  };

  const onNavigateToAuth = () => {
    try {
      navigate("/", { state: null });
    } catch (e) {
      console.log(e);
    }
  };
  const onChangeAddressDetails = (e) => {
    try {
      let name = e.target.name;
      let value = e.target.value;
      setFormData((ps) => ({ ...ps, [name]: value }));
    } catch (e) {
      console.log(e);
    }
  };

  const getAllAddressList = async () => {
    try {
      const res = await getAddress();
      setAddressList(res?.data);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getAllAddressList();
  }, []);

  const onChangeAddress = (x) => {
    try {
      setSelectedAddress(x);
    } catch (e) {
      console.log(e);
    }
  };

  let product = location?.state[1];
  const onDeleteAddress = async (id) => {
    try {
      const res = await deleteAddress(id);
      if (res?.data?.message === "Adress removed") {
        getAllAddressList();
      }
    } catch (e) {
      console.log(e);
    }
  };

  //post or update address
  const postOrderToUser = async (type) => {
    try {
      setOrderText("Order Now");
      if (!deliveryForm && type === "post") {
        const res = await postAddress(formData);
        if (res?.data?.message === "Address added") {
          getAllAddressList();
          clearForm();
        }
      } else if (deliveryForm) {
        const res = await updateAddress(selectedAddress?._id, formData);
        if (res?.data?.message === "address details updated") {
          getAllAddressList();
        }
      }
      let reqBody = location?.state[1];
      reqBody.quantity = location?.state[2];
      await postSoldProd(reqBody);
    } catch (e) {
      console.log(e);
    }
  };
  const [editFormData, setEditFormData] = useState({});
  const onChangeEditFormData = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    setEditFormData((ps) => ({ ...ps, [name]: value }));
  };
  const onSetEditForm = () => {
    try {
      document.getElementById("username1").value = selectedAddress?.username;
      document.getElementById("email1").value = selectedAddress?.email;
      document.getElementById("contact1").value = selectedAddress?.contact;
      document.getElementById("state1").value = selectedAddress?.state;
      document.getElementById("city1").value = selectedAddress?.city;
      document.getElementById("addressId").value = selectedAddress?.address;
      document.getElementById("landmark1").value = selectedAddress?.landmark;
      document.getElementById("pincode1").value = selectedAddress?.pincode;
      setEditFormData({
        username: selectedAddress?.username,
        email: selectedAddress?.email,
        contact: selectedAddress?.contact,
        state: selectedAddress?.state,
        city: selectedAddress?.city,
        address: selectedAddress?.address,
        landmark: selectedAddress?.landmark,
        pincode: selectedAddress?.pincode,
      });
    } catch (e) {
      console.log(e);
    }
  };
  const updateAddressFun = async () => {
    try {
      const res = await updateAddress(selectedAddress?._id, editFormData);
      if (res?.data?.message === "address details updated") {
        getAllAddressList();
      }
    } catch (e) {
      console.log(e);
    }
  };
  const [deliveryForm, setDeliveryForm] = useState(false);
  const onSetDeliveryAddressForm = () => {
    try {
      setDeliveryForm(true);
      document.getElementById("username").value = selectedAddress?.username;
      document.getElementById("email").value = selectedAddress?.email;
      document.getElementById("contact").value = selectedAddress?.contact;
      document.getElementById("state").value = selectedAddress?.state;
      document.getElementById("city").value = selectedAddress?.city;
      document.getElementById("address").value = selectedAddress?.address;
      document.getElementById("landmark").value = selectedAddress?.landmark;
      document.getElementById("pincode").value = selectedAddress?.pincode;
      setFormData({
        username: selectedAddress?.username,
        email: selectedAddress?.email,
        contact: selectedAddress?.contact,
        state: selectedAddress?.state,
        city: selectedAddress?.city,
        address: selectedAddress?.address,
        landmark: selectedAddress?.landmark,
        pincode: selectedAddress?.pincode,
      });
    } catch (e) {
      console.log(e);
    }
  };
  const clearForm = () => {
    document.getElementById("username").value = "";
    document.getElementById("email").value = "";
    document.getElementById("contact").value = "";
    document.getElementById("state").value = "";
    document.getElementById("city").value = "";
    document.getElementById("address").value = "";
    document.getElementById("landmark").value = "";
    document.getElementById("pincode").value = "";
  };

  return (
    <div className="emailContainer">
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
            <h4 className="shopcartTitle" onClick={onNavigateToAuth}>
              Shop cart
            </h4>
          </div>
          <div className="flexContainer">
            <p className="navOptions" onClick={() => onDisplayHome("home")}>
              <AiOutlineHome className="itemIcon" />
            </p>
            <button
              onClick={() =>
                navigate("/history", { state: location?.state[0] })
              }
              className="navOptions"
            >
              <SiShopify className="itemIcon" />
            </button>
          </div>
        </div>
      </nav>
      <div>
        <div>
          <div className="mailContainerforEmail" style={{ padding: "20px" }}>
            <img
              src={product?.productimage}
              height={200}
              width={200}
              style={{ marginRight: "20px", borderRadius: "5px" }}
            />
            <div>
              <p>{product?.productname}</p>
              <p>{product?.productdescription}</p>
              <i>Quantity :{location?.state[2]}</i>
              <h5>
                <sub>
                  <i>price :{product?.productprice}$</i>
                </sub>
                <sup>
                  <i>{product?.productdiscount}</i>
                </sup>
              </h5>
              <Star star={product?.productrating} />
              <p style={{ paddingTop: "10px" }}>
                <spam style={{ color: "blue" }}>Sold :</spam>
                <i>{product?.productsoldcount}</i>
              </p>
            </div>
          </div>
          <div>
            <h4 className="addressText text-center">
              Select a delivery address
            </h4>
            <div className="addressContainer">
              {AddressList?.map((x) => {
                return (
                  <div className="form-check" key={x._id}>
                    <input
                      className="form-check-input"
                      type="radio"
                      name="address"
                      id="address1"
                      onClick={() => {
                        onChangeAddress(x);
                      }}
                    />
                    <label className="form-check-label" htmlFor="address1">
                      <ul>
                        <li>username :{x?.username}</li>
                        <li>email :{x?.email}</li>
                        <li>contact :{x?.contact}</li>
                        <li>state :{x?.state}</li>
                        <li>city :{x?.city}</li>
                        <li>address :{x?.address}</li>
                        <li>landmark :{x?.landmark}</li>
                        <li>pincode :{x?.pincode}</li>
                      </ul>
                      <hr style={{ width: "60rem" }} />
                    </label>
                  </div>
                );
              })}
              <div>
                <button
                  type="button"
                  className="btn btn-warning mx-5 mb-4"
                  data-bs-toggle="modal"
                  data-bs-target="#exampleModal"
                  disabled={selectedAddress === "" ? true : false}
                  style={{ width: "200px" }}
                  onClick={onSetDeliveryAddressForm}
                >
                  Delivery to this address
                </button>
                <button
                  type="button"
                  className="btn btn-secondary mb-4"
                  data-bs-toggle="modal"
                  data-bs-target="#exampleModal"
                  style={{ width: "200px" }}
                  onClick={() => setOrderText("Order Now")}
                >
                  Add New Address
                </button>
                <br />
                <button
                  type="button"
                  className="btn btn-secondary mb-4 mx-5"
                  style={{ width: "200px" }}
                  disabled={selectedAddress === "" ? true : false}
                  data-bs-toggle="modal"
                  data-bs-target="#staticBackdrop"
                  onClick={onSetEditForm}
                >
                  Edit Address
                </button>
                <button
                  onClick={() => onDeleteAddress(selectedAddress?._id)}
                  className="btn btn-danger mb-4"
                  disabled={selectedAddress === "" ? true : false}
                  style={{ width: "200px" }}
                >
                  Delete address
                </button>
                <br />
                <div
                  className="modal fade"
                  id="exampleModal"
                  tabIndex="-1"
                  aria-labelledby="exampleModalLabel"
                  aria-hidden="true"
                >
                  <div className="modal-dialog">
                    <div className="modal-content">
                      <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">
                          Please Fill address
                        </h5>
                        <button
                          type="button"
                          className="btn-close"
                          data-bs-dismiss="modal"
                          aria-label="Close"
                        ></button>
                      </div>
                      <div className="modal-body">
                        <div className="emailPage">
                          <form ref={form} onSubmit={sendEmail}>
                            <label>Enter Username :</label>
                            <br />
                            <input
                              type="text"
                              name="username"
                              id="username"
                              placeholder="Enter your name"
                              className="mb-2"
                              onChange={onChangeAddressDetails}
                            />
                            <br />
                            <label>Enter Email :</label> <br />
                            <input
                              type="email"
                              name="email"
                              id="email"
                              placeholder="example@gmail.com"
                              className="mb-2"
                              onChange={onChangeAddressDetails}
                            />
                            <br />
                            <label>Enter Contact :</label> <br />
                            <input
                              type="text"
                              name="contact"
                              id="contact"
                              placeholder="+91"
                              className="mb-2"
                              onChange={onChangeAddressDetails}
                            />
                            <br />
                            <label>Enter State :</label> <br />
                            <input
                              type="text"
                              name="state"
                              id="state"
                              placeholder="e.g Telangana"
                              className="mb-2"
                              onChange={onChangeAddressDetails}
                            />
                            <br />
                            <label>Enter City :</label> <br />
                            <input
                              type="text"
                              name="city"
                              id="city"
                              placeholder="e.g Hyderabad"
                              className="mb-2"
                              onChange={onChangeAddressDetails}
                            />
                            <br />
                            <label>
                              Enter House , building, Appartment, Colony:
                            </label>
                            <br />
                            <input
                              type="text"
                              name="address"
                              id="address"
                              placeholder="e.g house no"
                              className="mb-2"
                              onChange={onChangeAddressDetails}
                            />
                            <br />
                            <label>Enter Landmark :</label> <br />
                            <input
                              type="text"
                              name="landmark"
                              id="landmark"
                              placeholder="Enter landmark"
                              className="mb-2"
                              onChange={onChangeAddressDetails}
                            />
                            <br />
                            <label>Enter Pincode/zipcode :</label> <br />
                            <input
                              type="text"
                              name="pincode"
                              id="pincode"
                              placeholder="e.g 501511"
                              className="mb-2"
                              onChange={onChangeAddressDetails}
                            />
                            <input
                              type="text"
                              className="mb-2"
                              name="product"
                              id="product"
                              defaultValue={productDetails}
                              hidden={true}
                            />
                            <br />
                            <button
                              type="submit"
                              className={
                                orderText === "Order Now"
                                  ? "orderBtn"
                                  : "orderPlaced"
                              }
                              onClick={() => postOrderToUser("post")}
                            >
                              {orderText}
                            </button>
                          </form>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <div
                  class="modal fade"
                  id="staticBackdrop"
                  data-bs-backdrop="static"
                  data-bs-keyboard="false"
                  tabindex="-1"
                  aria-labelledby="staticBackdropLabel"
                  aria-hidden="true"
                >
                  <div class="modal-dialog">
                    <div class="modal-content">
                      <div class="modal-header">
                        <h5 class="modal-title" id="staticBackdropLabel">
                          Update Address
                        </h5>
                        <button
                          type="button"
                          class="btn-close"
                          data-bs-dismiss="modal"
                          aria-label="Close"
                        ></button>
                      </div>
                      <div class="modal-body">
                        <label>Enter Username :</label>
                        <br />
                        <input
                          type="text"
                          name="username"
                          id="username1"
                          placeholder="Enter your name"
                          className="mb-2"
                          onChange={onChangeEditFormData}
                        />
                        <br />
                        <label>Enter Email :</label> <br />
                        <input
                          type="email"
                          name="email"
                          id="email1"
                          placeholder="example@gmail.com"
                          className="mb-2"
                          onChange={onChangeEditFormData}
                        />
                        <br />
                        <label>Enter Contact :</label> <br />
                        <input
                          type="text"
                          name="contact"
                          id="contact1"
                          placeholder="+91"
                          className="mb-2"
                          onChange={onChangeEditFormData}
                        />
                        <br />
                        <label>Enter State :</label> <br />
                        <input
                          type="text"
                          name="state"
                          id="state1"
                          placeholder="e.g Telangana"
                          className="mb-2"
                          onChange={onChangeEditFormData}
                        />
                        <br />
                        <label>Enter City :</label> <br />
                        <input
                          type="text"
                          name="city"
                          id="city1"
                          placeholder="e.g Hyderabad"
                          className="mb-2"
                          onChange={onChangeEditFormData}
                        />
                        <br />
                        <label>
                          Enter House , building, Appartment, Colony:
                        </label>
                        <br />
                        <input
                          type="text"
                          name="address"
                          id="addressId"
                          placeholder="e.g house no"
                          className="mb-2"
                          onChange={onChangeEditFormData}
                        />
                        <br />
                        <label>Enter Landmark :</label> <br />
                        <input
                          type="text"
                          name="landmark"
                          id="landmark1"
                          placeholder="Enter landmark"
                          className="mb-2"
                          onChange={onChangeEditFormData}
                        />
                        <br />
                        <label>Enter Pincode/zipcode :</label> <br />
                        <input
                          type="text"
                          name="pincode"
                          id="pincode1"
                          placeholder="e.g 501511"
                          className="mb-2"
                          onChange={onChangeEditFormData}
                        />
                      </div>
                      <div class="modal-footer">
                        <button
                          type="button"
                          class="btn btn-secondary"
                          data-bs-dismiss="modal"
                        >
                          Cancel
                        </button>
                        <button
                          type="button"
                          class="btn btn-primary"
                          onClick={updateAddressFun}
                        >
                          Update Address
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Email;
