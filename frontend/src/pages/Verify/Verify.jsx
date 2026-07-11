import React from "react";
import "./Verify.css";
import { useContext } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { StoreContext } from "../../context/StoreContext";
import axios from "axios";
import { useEffect } from "react";

const Verify = () => {

    const [searchParams,setSearchParams] = useSearchParams();
    const success = searchParams.get("success");
    const orderId = searchParams.get("orderId");
    const {url} = useContext(StoreContext);
    const navigate = useNavigate();

    useEffect(() => {
  verifyPayment();
}, []);

const verifyPayment = async () => {
  try {
    const response = await axios.post(
      url + "/api/order/verify",
      { success, orderId }
    );

    console.log(response.data);

    if (response.data.success) {
      navigate("/myorders");
    } else {
      navigate("/");
    }
  } catch (error) {
    console.log(error);
    navigate("/");
  }
};


  return (
    <div>
      <div className="verify">
        <div className="spinner"></div>
      </div>
    </div>
  );
};

export default Verify;