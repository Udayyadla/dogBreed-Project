import React from "react";
import { useNavigate } from "react-router-dom";
import "./header.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Header = () => {
  const navigate = useNavigate();
  const Logout = () => {
    toast.success("Logged Out succesfully");
    setTimeout(() => {
      localStorage.clear("authToken");
      navigate("/");
    }, 5000);
  };
  return (
    <div className="Header-container">
      <img
        className="dog-logo"
        src="https://images.creativemarket.com/0.1.0/ps/7143452/2418/1610/m1/fpnw/wm1/dog-logo-01-.jpg?1571185908&s=8a5b6c7400230736fa34e243a6fb8219"
        alt="dog-logo"
      />

      <p onClick={Logout}>Logout</p>

      <ToastContainer />
    </div>
  );
};

export default Header;
